import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import supabaseMiddleware from "../middlewares/supabaseClient.ts";

const commentRouter = new Router();

commentRouter   
    .get("/comments/:commend_id", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const comment_id = ctx.params.commend_id;
        const { data, error } = await supabaseClient
            .from("comments")
            .select("*")
            .eq("comment_id", comment_id)
            .single();

        if (error) {
            ctx.response.body = {
                error: error
            },
            ctx.response.status = 404;
            return;
        }

        if (data.type === "audio") {
            ctx.response.redirect("audio/" + comment_id)
            ctx.response.status = 301;
            return;
        }

        ctx.response.redirect("text/" + comment_id)
        ctx.response.status = 301;
        return;
    })
    .get("/comments", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const start = Number.parseInt(ctx.request.url.searchParams.get("start") ?? "0");
        const end = Number.parseInt(ctx.request.url.searchParams.get("end") ?? "10");

        const { data, error } = await supabaseClient
            .from("comments")
            .select("*")
            .range(start, end);

        if (error) {
            ctx.response.body = {
                error: error
            },
            ctx.response.status = 404;
            return;
        }

        ctx.response.body = data;
        ctx.response.status = 200;
    })
    .delete("/comments/:comment_id", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const userData = ctx.userData;
        const comment_id = ctx.params.comment_id;

        const { data: commentData, error: commentError } = await supabaseClient
            .from("comments")
            .select("*")
            .eq("comment_id", comment_id)
            .single();

        if (commentError) {
            ctx.response.body = {
                error: commentError
            },
            ctx.response.status = 404;
            return;
        }

        if (commentData.user_id !== userData?.id) {
            ctx.response.status = 401;
            ctx.response.body = {
                error: "Unauthorized",
            };
            return;
        }

        if (commentData.type === "audio") {
            ctx.response.redirect("audio/" + comment_id)
            ctx.response.status = 301;
            return;
        }

        ctx.response.redirect("text/" + comment_id)
        ctx.response.status = 301;
    });

export default commentRouter;