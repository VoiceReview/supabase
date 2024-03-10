import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { User, createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { Database } from "../../_shared/database.type.ts";

declare module "https://deno.land/x/oak@v11.1.0/mod.ts" {
    interface Context {
        supabaseClient: ReturnType<typeof createClient<Database>>;
        userData: User | null;
    }
}

async function supabaseMiddleware(ctx: Context, next: () => Promise<any>) {
    const supabaseClient = createClient<Database>(
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

    const { data: userData, error } = await supabaseClient.auth.getUser();

    if (error) {
        ctx.response.status = 401;
        ctx.response.body = {
            error: "Unauthorized",
        };
        return;
    }

    ctx.supabaseClient = supabaseClient;
    ctx.userData = {
        id: userData.user.id,
        app_metadata: userData.user.app_metadata,
        user_metadata: userData.user.user_metadata,
        aud: userData.user.aud,
        created_at: userData.user.created_at
    };

    await next();
}

export default supabaseMiddleware;