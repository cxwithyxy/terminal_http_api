import should from "should";
import { Httpserver } from "../src/net/Httpserver";

describe("Httperserver", () =>
{
    it("# 基础运行", async () =>
    {
        await new Httpserver().start()
    })
})