import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
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
        ctx.body = this.t_m.close(ctx.request.body.id)
    }
    
    async web_run(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.body = this.t_m.run(ctx.request.body.id, ctx.request.body.cmd)
    }

    async web_result(ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>)
    {
        ctx.type = "text/html"
        ctx.body = this.t_m.result(ctx.request.body.id)
    }

    router_init()
    {
        let router = new Router ()
        
        router.post('/all', this.web_all.bind(this))
        
        router.post('/create', this.web_create.bind(this))
        
        router.post('/close', this.web_close.bind(this))
        
        router.post('/run', this.web_run.bind(this))
        
        router.post('/result', this.web_result.bind(this))

        return router
    }

    async start(port: number)
    {
        let app = new Koa()

        app.use(bodyParser())

        let router = this.router_init()

        app.use(router.routes()).use(router.allowedMethods())

        app.listen(port);
    }


    close_now()
    {
        
    }
}