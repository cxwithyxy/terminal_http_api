import { Httpserver } from "./net/Httpserver";
import { Terminal_manager } from "./terminal/Terminal_manager";

(async ()=>
{
    console.log("server start");
    
    await new Httpserver(new Terminal_manager()).start()
})()