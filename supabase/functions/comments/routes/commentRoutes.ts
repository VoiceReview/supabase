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
    })
    .post("/comments/:comment_id/like", supabaseMiddleware, async (ctx) => {
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
                error: "Failed to get comment with id " + comment_id
            },
            ctx.response.status = 404;
            return;
        }

        const body = ctx.request.body({ type: 'form-data' });
        const formData = await body.value.read();
        const like = formData.fields.liked;

        if (like !== "true" && like !== "false") {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "Invalid like value provided in form data",
            };
            return;
        }

        const { data: likeData, error: likeError } = await supabaseClient 
            .from("reaction")
            .select("*")
            .eq("comment_id", comment_id)
            .eq("user_id", userData?.id ?? "")
            .single();
        
        if (likeError) {
            ctx.response.body = {
                error: "Failed to get like data for comment with id " + comment_id
            },
            ctx.response.status = 404;
            return;
        }

        if (likeData !== null) {
            ctx.response.status = 200;
            ctx.response.body = {
                message: "Like already exists. Please update your like instead.",
                updateUrl: `/comments/${comment_id}/updateLike`,
            };
            return;
        }

        const { data: _insertData, error: insertError } = await supabaseClient
            .from("reaction")
            .insert({
                comment_id: comment_id,
                like_type: like === "true",
            });

        if (insertError) {
            ctx.response.body = {
                error: "Failed to insert like data for comment with id " + comment_id
            },
            ctx.response.status = 404;
            return;
        }

        ctx.response.status = 201;
        ctx.response.body = {
            message: "Like data inserted successfully",
        };
        return;
    })
    .put("/comments/:comment_id/like", supabaseMiddleware, async (ctx) => { 
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
                error: "Failed to get comment with id " + comment_id
            },
            ctx.response.status = 404;
            return;
        }

        const body = ctx.request.body({ type: 'form-data' });
        const formData = await body.value.read();
        const like = formData.fields.liked;

        if (like !== "true" && like !== "false") {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "Invalid like value provided in form data",
            };
            return;
        }

        const { data: likeData, error: likeError } = await supabaseClient 
            .from("reaction")
            .select("*")
            .eq("comment_id", comment_id)
            .eq("user_id", userData?.id ?? "")
            .single();
        
        if (likeError) {
            ctx.response.body = {
                error: "Failed to get like data for comment with id " + comment_id
            },
            ctx.response.status = 404;
            return;
        }

        if (likeData === null) {
            ctx.response.status = 404;
            ctx.response.body = {
                error: "Like does not exist. Please create a like instead.",
                createUrl: `/comments/${comment_id}/like`,
            };
            return;
        }

        const { data: _updateData, error: updateError } = await supabaseClient
            .from("reaction")
            .update({
                like_type: like === "true",
            })
            .eq("comment_id", comment_id)
            .eq("user_id", userData?.id ?? "");

        if (updateError) {
            ctx.response.body = {
                error: "Failed to update like data for comment with id " + comment_id
            },
            ctx.response.status = 404;
            return;
        }

        ctx.response.status = 200;
        ctx.response.body = {
            message: "Like data updated successfully",
        };
        return;
    })

export default commentRouter;