const pty = require("node-pty");

import _ from "lodash";
import stripAnsi from "strip-ansi";

export class Terminal
{
    id = 0
    self_terminal: any
    result_list: Array<string> = []

    constructor(id: number)
    {
        this.id = id
        this.self_terminal = pty.spawn("cmd.exe", [],
        {
            name: 'xterm',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env
        });
        this.self_terminal.on('data', (data: string) =>
        {
            this.result_list.push(data)
        })
    }

    /**
     * 获得当前终端id
     *
     * @returns {number}
     * @memberof Terminal
     */
    get_id(): number
    {
        return this.id
    }

    /**
     * 获得未读的输出
     *
     * @returns {Array<string>}
     * @memberof Terminal
     */
    output(): Array<string>
    {
        let output =  _.cloneDeep(this.result_list)
        this.result_list = []
        return output
    }

    /**
     * 运行命令
     *
     * @param {string} cmd
     * @memberof Terminal
     */
    run(cmd: string)
    {
        this.self_terminal.write(`${cmd}\r`)
    }
}