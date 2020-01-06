const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

const middleware = name => async (ctx, next) => {
  console.log(`${name} down`);
  await next();
  console.log(`${name} up`);
};

const routerLow = new Router();
routerLow.all('*', middleware('inner 1'));

router.use(routerLow.routes());

router.all('*', middleware('middle 1'));

app.use(router.routes());

app.use(middleware('top 1'));

// response

app.use(async ctx => {
  console.log('response');
  ctx.body = 'Hello World';
});

app.listen(3000);
