import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { Database } from "../../_shared/database.type.ts";

type Comment = {
    comment_id: string,
    type: "audio" | "text",
    user_id: string,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date,
}

type AudioComment = {
    audio_id: string,
    comment_id: string,
    url: string,
}

type TextComment = {
    text_id: string,
    comment_id: string,
    text: string,
}

type CreateAudioComment = {
    audio_blob: Blob,
    comment_id: string,
    content_type: string,
}

type CreateTextComment = {
    text: string,
    comment_id: string,
}

type CreateComment = {
    user_id: string, // Assuming the ReturnType of crypto.randomUUID is string
} & (
        { type: "audio" } & CreateAudioComment | // Combine "audio" type with CreateAudioComment
        { type: "text" } & CreateTextComment // Combine "text" type with CreateTextComment
    );

type AudioRes = {
    data?: Comment & AudioComment,
    error?: Error
}

type TextRes = {
    data?: Comment & TextComment,
    error?: Error
}

export const insertComment = async (supabaseClient: ReturnType<typeof createClient<Database>>, commentData: CreateComment) => {
    if (commentData.type !== "audio" && commentData.type !== "text") {
        throw new Error("Invalid comment type")
    }

    const { data, error } = await supabaseClient
        .from('comments')
        .insert({
            type: commentData.type,
            user_id: commentData.user_id,
        })
        .select('*')
        .single();

    if (error) {
        return {
            error: new Error("Failed to insert comment")
        }
    }

    const created_at = new Date(data?.created_at ?? new Date());
    const updated_at = new Date(data?.updated_at ?? new Date());
    const deleted_at = data?.deleted_at ? new Date(data?.deleted_at) : undefined;

    if (commentData.type === "audio") {
        const res = await insertAudioComment(supabaseClient, {
            comment_id: data?.comment_id ?? "",
            audio_blob: commentData.audio_blob,
            content_type: commentData.content_type,
        });

        if (res.error) {
            return {
                error: res.error
            }
        }

        return {
            data: {
                ...res.data,
                comment_id: data?.comment_id ?? "",
                user_id: commentData.user_id,
                created_at: created_at,
                updated_at: updated_at,
                deleted_at: deleted_at,
                type: "audio",
            }
        }
    }

    const res = await insertTextComment(supabaseClient, {
        comment_id: data?.comment_id ?? "",
        text: commentData.text,
    })

    if (res.error) {
        return {
            error: res.error
        }
    }

    if (res.data?.type !== "text") {
        return {
            error: new Error("Failed to insert text comment")
        }
    }

    return {
        data: {
            ...res.data,
            type: "text",
            comment_id: data?.comment_id ?? "",
            user_id: commentData.user_id,
            created_at: created_at,
            updated_at: updated_at,
            deleted_at: deleted_at,
        }
    }
}

export const insertAudioComment = async (supabaseClient: ReturnType<typeof createClient<Database>>, audioData: CreateAudioComment): Promise<AudioRes> => {
    if (audioData.audio_blob.size > 50 * 1024 * 1024) {
        return {
            error: new Error("Audio file too large")
        }
    }

    if (audioData.content_type !== "audio/ogg; codecs=opus") {
        return {
            error: new Error("Invalid audio file type")
        }
    }

    if (audioData.audio_blob === null) {
        return {
            error: new Error("Invalid audio file")
        }
    }

    const { data, error } = await supabaseClient
        .storage
        .from("audio-reviews")
        .upload(
            "public/" + audioData.comment_id + ".ogg",
            audioData.audio_blob, {
            contentType: audioData.content_type,
        });

    if (error) {
        return {
            error: new Error("Failed to upload audio comment")
        }
    }

    const { data: audioDataRes, error: audioError } = await supabaseClient
        .from("audios")
        .insert({
            audio_id: audioData.comment_id,
            comment_id: audioData.comment_id,
            url: data?.path ?? "",
        })
        .select()
        .single();

    if (audioError) {
        return {
            error: new Error("Failed to insert audio comment")
        }
    }

    return {
        data: {
            comment_id: audioData.comment_id,
            audio_id: audioDataRes?.audio_id ?? "",
            url: audioDataRes?.url ?? "",
            type: "audio",
            user_id: "", // to add in the calling function
            created_at: new Date(), // to add in the calling function
            updated_at: new Date(), // to add in the calling function
            deleted_at: undefined, // to add in the calling function
        }
    }

}

export const insertTextComment = async (supabaseClient: ReturnType<typeof createClient<Database>>, textData: CreateTextComment): Promise<TextRes> => {
    if (textData.text.length > 1000) {
        return {
            error: new Error("Text comment too long")
        }
    }

    const { data, error } = await supabaseClient
        .from("texts")
        .insert({
            comment_id: textData.comment_id,
            content: textData.text,
        })
        .select()
        .single();

    if (error) {
        return {
            error: new Error("Failed to insert text comment")
        }
    }

    return {
        data: {
            comment_id: textData.comment_id,
            text_id: data?.text_id ?? "",
            text: data?.content ?? "",
            type: "text",
            user_id: "", // to add in the calling function
            created_at: new Date(), // to add in the calling function
            updated_at: new Date(), // to add in the calling function
            deleted_at: undefined, // to add in the calling function
        }
    }
}