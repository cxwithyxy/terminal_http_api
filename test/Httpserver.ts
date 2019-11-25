import should from "should";
import { Httpserver } from "../src/net/Httpserver";

describe("Httperserver", () =>
{
    it("# 基础运行", async () =>
    {
        await new Httpserver().start()
    }).timeout(5 * 60e3)

    it("# 基础运行2", async () =>
    {
        console.log(1111);
    })

})