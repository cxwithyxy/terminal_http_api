import { Terminal_manager } from "../src/terminal/Terminal_manager";
import should from "should";
import sleep from "sleep-promise";
import * as _ from "lodash"

describe("Terminal_manager", () =>
{
    let t_m: Terminal_manager

    beforeEach(() =>
    {
        t_m = new Terminal_manager()
    })

    afterEach(() =>
    {
        t_m.close_all()
    })

    function create_some_terminal(): number
    {
        let number_term_generate = _.random(3,10)
        for (let index = 0; index < number_term_generate; index++)
        {
            t_m.create()
        }
        return number_term_generate
    }

    it("# create", () =>
    {
        let term_id = t_m.create()
        should(term_id).greaterThanOrEqual(0)
        let term = t_m.get_terminal(term_id)
        should(term).not.be.undefined()
    })

    it("# all", () =>
    {
        let number_term_generate = create_some_terminal()
        let all_id = t_m.all()
        should(all_id.length).equal(number_term_generate)
    })

    it("# close", () =>
    {
        create_some_terminal()
        let all_id = t_m.all()
        let id = <number>_.sample(all_id)
        t_m.close(id)
        all_id = t_m.all()
        should(_.find(all_id, id)).be.undefined()
    })

    it("# run & result", async () =>
    {
        let term_id = t_m.create()
        t_m.run(term_id, "echo 222")
        await sleep(2e3)
        let result = t_m.result(term_id);
        should(result).match(/echo 222/)
        
    }).timeout(30e3)

})
