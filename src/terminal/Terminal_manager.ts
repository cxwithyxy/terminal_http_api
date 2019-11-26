export class Terminal_managaer
{
    current_id = 0
    terminal_list = []

    
    /**
     * 获取所有的终端id
     *
     * @returns {Array<number>}
     * @memberof Terminal_managaer
     */
    all(): Array<number>
    {
        return []
    }


    /**
     * 创建一个新的终端
     *
     * @returns {number} 返回终端的ID
     * @memberof Terminal_managaer
     */
    create(): number
    {
        return 0
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
        return 1
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
        return ""
    }
}