import http_shutdown from "http-shutdown";
const HTTPSERVER =require('node-http-server');

export class Httpserver extends HTTPSERVER.Server
{
    is_running = false
    is_stopping = false

    async start()
    {
        const config = new HTTPSERVER.Config;
        
        config.port = 8000;
        
        await new Promise ((succ) =>
        {
            setTimeout(() =>
            {
                this.deploy(config);
            })
            this.is_running = true
            setInterval(() =>
            {
                if(!this.is_running)
                {
                    succ()
                }
            }, 1e3)

        })

    }

    onRawRequest(request: { uri: any; headers: any; connection: { end: () => void; destroy: any; }; },response: any,serve: (arg0: any, arg1: any, arg2: string) => void){
     
        serve(
            request,
            response,
            JSON.stringify(
                {
                    uri:request.uri,
                    headers:request.headers
                }
            )
        );
        console.log("income");
        
        if(this.is_stopping)
        {
            response.end(); //close the response
            request.connection.end(); //close the socket
            request.connection.destroy; //close it really
        }

        this.close_now()
        
        return true;
    }

    close_now()
    {
        if(this.is_stopping)
        {
            return
        }
        this.is_stopping = true
        this.server.on("close", () =>
        {
            console.log("shutdown");
            this.is_stopping = false
            this.is_running = false
        })
        this.server.close()
    }
}