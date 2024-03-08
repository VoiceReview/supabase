import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const audioRouter = new Router();

audioRouter
    .get("/audio",  (ctx) => {
        ctx.response.body = 'This is an example Oak server running on Edge Functions!';
    })
    .get("/audio/:id", async (ctx) => {     
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? '',
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '',
            {
                global: {
                    headers: {
                        Authorization: ctx.request.headers.get('Authorization')!,
                    }
                }
            }
        );

        const { data, error } = await supabaseClient
            .from("audio")
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

export default audioRouter;