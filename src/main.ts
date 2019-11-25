import { Httpserver } from "./net/Httpserver";

(async ()=>
{
    console.log("server start");
    
    await new Httpserver().start()
})()