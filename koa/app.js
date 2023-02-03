const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const app = new Koa();
const router = new Router();




const resolves = new Set();

router.get('/subscribe', async (ctx, next) => {
    let promise = await new Promise((resolve) => {
        resolves.add(resolve);
        ctx.res.on('close', () => {
            resolves.delete(resolve);
            resolve();
        })
    })

    ctx.body = promise;
});

router.post('/publish', bodyParser(), async (ctx, next) => {
    let body = ctx.request.body.message;

    if (!body) {
        ctx.throw(400, 'empty message')
    };
    resolves.forEach(res => {
        res(body);
    })
    resolves.clear()
    ctx.body = `ok`;

});



app.use(router.routes());
module.exports = app;