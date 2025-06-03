import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import router from "./src/routes";

const app = new Koa();

app.use(
    cors({
        origin: "*",
        allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(
    bodyParser({
        enableTypes: ["json"],
        jsonLimit: "10mb",
    }),
);

// Error handling middleware
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const error = err as any;
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = {
            success: false,
            message: error.message || "Internal server error",
        };
        console.error("Error:", err);
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
    if (ctx.path === "/health") {
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "Server is running",
            timestamp: new Date().toISOString(),
        };
    } else {
        await next();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Todo API Server running on http://localhost:${PORT}`);
});
