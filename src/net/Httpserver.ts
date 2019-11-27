import Koa from "koa";
import Router from "koa-router";
import { Terminal_manager } from "./../terminal/Terminal_manager";

export class Httpserver
{
    t_m: Terminal_manager
    constructor(t_m: Terminal_manager)
    {
        this.t_m = t_m
    }

    async web_all(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.body = this.t_m.all()
    }

    async web_create(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.body = this.t_m.create()
    }

    async web_close(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.body = this.t_m.close(ctx.params.id)
    }

    async web_run(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.body = this.t_m.run(ctx.params.id, ctx.params.cmd)
    }

    async web_result(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.type = "text/html"
        ctx.body = this.t_m.result(ctx.params.id)
    }

    router_init()
    {
        let router = new Router ()
        
        router.get('/all', this.web_all.bind(this))
        
        router.get('/create', this.web_create.bind(this))
        
        router.get('/close/:id', this.web_close.bind(this))
        
        router.get('/run/:id/:cmd', this.web_run.bind(this))
        
        router.get('/result/:id', this.web_result.bind(this))

        return router
    }

    async start(port: number)
    {
        let app = new Koa()
        let router = this.router_init()

        app.use(router.routes()).use(router.allowedMethods())

        app.listen(port);
    }


    close_now()
    {
        
    }
}