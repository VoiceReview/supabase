import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { CreateComment, insertComment } from "../helpers/comments.ts";
import supabaseMiddleware from "../middlewares/supabaseClient.ts";

const textRouter = new Router();

textRouter
    .get("/comments/text/healtcheck", (ctx) => {
        ctx.response.body = "Audio service is up and running";
    })
    .get("/comments/text/:comment_id", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const commend_id = ctx.params.comment_id;
        const { data: commentData, error: commentError } = await supabaseClient
            .from("comments")
            .select("*")
            .eq("comment_id", commend_id)
            .single();
            
        if (commentError) {
            ctx.response.body = {
                error: commentError
            };
            ctx.response.status = 404;
            return;
        }

        const { data: textData, error: textError } = await supabaseClient
            .from("texts")
            .select("*")
            .eq("comment_id", commend_id)
            .single();

        if (textError) {
            ctx.response.body = {
                error: textError
            };
            ctx.response.status = 404;
            return;
        }

        const resData = {
            ...commentData,
            ...textData
        }

        ctx.response.body = {
            data: resData
        }
        ctx.response.status = 200;
    })
    .post("/comments/text", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const userData = ctx.userData;

        const body = ctx.request.body({ type: 'form-data' });
        const formData = await body.value.read();
        const type = formData.fields["type"];

        if (!type || (type !== "audio" && type !== "text")) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "No comment type provided in form data or invalid comment type provided",
            };
            return;
        }

        if (type && type === "audio") {
            ctx.response.redirect("/comments/audio");
            ctx.response.status = 301;
            return;
        }

        const text = formData.fields.text;
        if (!text) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "No text provided",
            };
            return;
        }

        const commentData: CreateComment = {
            type: "text",
            user_id: userData?.id ?? "",
            text: text,
            comment_id: "",
        };

        const res = await insertComment(supabaseClient, commentData);

        if (res.error) {
            ctx.response.status = 500;
            ctx.response.body = {
                error: res.error.message,
            };
            return;
        }

        ctx.response.body = {
            data: res.data,
        };
        ctx.response.status = 201;
        return;
    })
    .delete("/comments/text/:comment_id", supabaseMiddleware, async (ctx) => {
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

        const { data: textData, error: textError } = await supabaseClient
            .from("texts")
            .delete()
            .eq("comment_id", comment_id);
        
        if (textError) {
            ctx.response.body = {
                error: textError
            },
            ctx.response.status = 404;
            return;
        }

        const { data: commentDeleteData, error: commentDeleteError } = await supabaseClient
            .from("comments")
            .delete()
            .eq("comment_id", comment_id);

        if (commentDeleteError) {
            ctx.response.body = {
                error: commentDeleteError
            },
            ctx.response.status = 404;
            return;
        }

        ctx.response.body = {
            data: commentDeleteData
        }
        ctx.response.status = 200;
    })


export default textRouter;