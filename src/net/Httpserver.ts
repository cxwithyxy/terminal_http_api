const HTTPSERVER = require("@awesomeeng/awesome-server")

export class Httpserver
{
    server: any

    async start()
    {
        let server = new HTTPSERVER()
        this.server = server
        server.addHTTPServer({
            hostname: "localhost",
            port: 8000
        });
        server.route("GET","/terminal_show",this.on_terminal_show)
        await server.start()
    }

    async on_terminal_show(path: any,request: any,response: any)
    {
        console.log("stop");
        this.server.stop()
    }
}