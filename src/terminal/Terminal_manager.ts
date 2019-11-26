import { Terminal } from "./Terminal"
import * as _ from "lodash";

export class Terminal_manager
{
    current_id = 0
    terminal_list: Array<Terminal> = []

    
    /**
     * 获取所有的终端id
     *
     * @returns {Array<number>}
     * @memberof Terminal_managaer
     */
    all(): Array<number>
    {
        return _.map(this.terminal_list, "id")
    }

    get_terminal(id: number): Terminal
    {
        let term = _.find(this.terminal_list, (elem: Terminal) =>
        {
            return elem.get_id() == id
        })
        if(_.isUndefined(term))
        {
            throw `get_terminal: id(${id}) terminal NOT FOUND`;
        }
        return term
    }

    /**
     * 创建一个新的终端
     *
     * @returns {number} 返回终端的ID
     * @memberof Terminal_managaer
     */
    create(): number
    {
        this.current_id ++
        let term = new Terminal(this.current_id)
        this.terminal_list.push(term)
        return this.current_id
    }

    close_all()
    {
        _.forEach(this.terminal_list, (elem: Terminal) =>
        {
            elem.close()
        })
        this.terminal_list = []
    }

    /**
     * 关闭终端
     *
     * @param {number} id 终端id
     * @returns {(0 | 1)} 是否成功
     * @memberof Terminal_managaer
     */
    close(id: number): 0 | 1
    {
        let term: Terminal
        try{
            term = this.get_terminal(id)
            term.close()
            _.remove(this.terminal_list, (elem: Terminal) =>
            {
                return elem.get_id() == id
            })
            return 1
        }
        catch(e)
        {
            return 0
        }
    }

    /**
     * 让终端运行命令
     *
     * @param {number} id 终端id
     * @param {string} cmd 命令行
     * @returns {(0 | 1)} 是否成功
     * @memberof Terminal_managaer
     */
    run(id: number, cmd: string): 0 | 1
    {
        this.get_terminal(id).run(cmd)
        return 1
    }

    
    /**
     * 获得未读的终端输出结果
     *
     * @param {number} id 终端id
     * @returns {string} 输出结果
     * @memberof Terminal_managaer
     */
    result(id: number): string
    {
        let aaa = this.get_terminal(id).output()
        console.log(aaa);
        
        return aaa.join("")
    }
}