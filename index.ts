import Koa, { Context } from "koa";

const app = new Koa();

// response
app.use((ctx: Context) => {
  ctx.body = "Hello Koa";
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
