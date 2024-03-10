import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { CreateComment, insertComment } from "../helpers/comments.ts";
import supabaseMiddleware from "../middlewares/supabaseClient.ts";

const audioRouter = new Router();

audioRouter
    .get("/comments/audio/healtcheck", (ctx) => {
        ctx.response.body = "Audio service is up and running";
    })
    .get("/comments/audio/:id", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;

        const { data, error } = await supabaseClient
            .from("audios")
            .select("*")
            .eq("audio_id", ctx.params.id)
            .single();

        console.log(data);
        console.error(error);

        ctx.response.body = {
            data,
            error
        };
    })
    .post("/comments/audio", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const userData = ctx.userData;

        const body = ctx.request.body({ type: 'form-data' });
        const formData = await body.value.read({
            maxSize: 100 * 1024 * 1024,
        });
        const type = formData.fields["type"];

        if (!type || (type !== "audio" && type !== "text")) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "No comment type provided in form data or invalid comment type provided",
            };
            return;
        }

        if (type && type === "text") {
            ctx.response.redirect("/comments/text");
            ctx.response.status = 301;
            return;
        }

        if (!formData.files || formData.files.length === 0) {
            ctx.response.status = 400;
            ctx.response.body = {
                error: "No audio file provided in form data",
            };
            return;
        }
        const audioFile = formData.files[0];
        const audioBlob = new Blob([audioFile.content!.buffer], { type: audioFile.contentType });

        const commentData: CreateComment = {
            type: "audio",
            user_id: userData?.id ?? "",
            audio_blob: audioBlob,
            content_type: audioFile.contentType,
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
    .delete("/comments/audio/:id", supabaseMiddleware, async (ctx) => {
        const supabaseClient = ctx.supabaseClient;
        const userData = ctx.userData;
        
        const { data, error } = await supabaseClient
            .from("audios")
            .select("*")
            .eq("audio_id", ctx.params.id)
            .single();

        if (error) {
            ctx.response.body = {
                error: error,
                message: "Error fetching audio data"
            },
            ctx.response.status = 404;
            return;
        }

        const { data: commentData, error: commentError } = await supabaseClient
            .from("comments")
            .select("*")
            .eq("comment_id", data.comment_id)
            .single();

        if (commentError) {
            ctx.response.body = {
                error: commentError,
                message: "Error fetching comment data"
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

        const { error: storageError } = await supabaseClient
            .storage
            .from("audios")
            .remove([data.url]);

        if (storageError) {
            ctx.response.body = {
                error: storageError
            },
            ctx.response.status = 500;
            return;
        }

        const { error: deleteError } = await supabaseClient
            .from("audios")
            .delete()
            .eq("audio_id", ctx.params.id);

        if (deleteError) {
            ctx.response.body = {
                error: deleteError
            },
            ctx.response.status = 500;
            return;
        }

        const { error: commentDeleteError } = await supabaseClient
            .from("comments")
            .delete()
            .eq("comment_id", data.comment_id);

        if (commentDeleteError) {
            ctx.response.body = {
                error: commentDeleteError
            },
            ctx.response.status = 500;
            return;
        }

        ctx.response.status = 204;
    });


export default audioRouter;