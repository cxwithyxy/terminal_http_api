import { Terminal } from "../src/terminal/Terminal";
import should from "should";
import sleep from "sleep-promise";


describe("Terminal", () =>
{
    let id = Math.round(Math.random()*100)
    let terminal: Terminal

    beforeEach(() =>
    {
        terminal = new Terminal(id)
    })
    
    it("# get_id", async () =>
    {
        should(terminal.get_id()).equal(id)
    })

    it("# run & result", async () =>
    {
        terminal.run(`echo 1`)
        await sleep(2e3)
        let result = terminal.output()
        console.log(result);
    }).timeout(10e3)

})
