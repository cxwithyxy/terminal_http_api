import * as pty from 'node-pty'
import * as _ from "lodash";

export class Terminal
{
    id = 0
    self_terminal: pty.IPty
    result_list: Array<string> = []

    constructor(id: number)
    {
        this.id = id
        this.self_terminal = pty.spawn("cmd.exe", [], {});
        this.self_terminal.on('data', (data: string) =>
        {
            this.result_list.push(data.replace(
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-Zbcf-nqry=><]/g, ''))
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

    close()
    {
        this.self_terminal.kill()
    }
}