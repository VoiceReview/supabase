import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import audioRouter from "./routes/audioRoutes.ts";
import commentRouter from "./routes/commentRoutes.ts";
import textRouter from "./routes/textRoutes.ts";

const app = new Application();

app.use(
    oakCors({
        origin: /^.+127.0.0.1:(3000)$/,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(commentRouter.routes());
app.use(commentRouter.allowedMethods());
app.use(audioRouter.routes());
app.use(audioRouter.allowedMethods());
app.use(textRouter.routes());
app.use(textRouter.allowedMethods());

await app.listen({ port: 8000 });