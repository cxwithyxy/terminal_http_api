import Koa from "koa";
import Router from "koa-router";

export class Httpserver
{
    is_running = false
    is_stopping = false

    async start()
    {
        let app = new Koa()
        let router = new Router ()

        app.use(ctx => {
            ctx.body = 'Hello Koa';
        });

        router.get('/', async ctx => {
            ctx.body = 'Hello Router';
        })

        app.use(router.routes()).use(router.allowedMethods())
        
        app.listen(8000);
    }


    close_now()
    {
        
    }
}