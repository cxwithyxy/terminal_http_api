import { Httpserver } from "./net/Httpserver";
import { Terminal_manager } from "./terminal/Terminal_manager";

(async ()=>
{
    let port = Number(process.argv[2])
    console.log(`terminal_http_api v0.20191129113811 server start (port: ${port})`);
    await new Httpserver(new Terminal_manager()).start(port)
})()