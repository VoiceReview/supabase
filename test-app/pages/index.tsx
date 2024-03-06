import { Inter } from "next/font/google";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/initSupabase";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const views: { id: ViewType; title: string }[] = [
  { id: "sign_in", title: "Sign In" },
  { id: "sign_up", title: "Sign Up" },
  { id: "magic_link", title: "Magic Link" },
  { id: "forgotten_password", title: "Forgotten Password" },
  { id: "update_password", title: "Update Password" },
  { id: "verify_otp", title: "Verify Otp" },
];

export default function Home() {
  const [view, setView] = useState(views[0]);

  return (
    <div className="container max-w-lg m-auto bg-white px-7 py-5 pb-16 mt-10 rounded-2xl">
      <div className="pb-3">
        <div className="flex flex-row items-center justify-center">
          <div>
            <Image
              src="/voicereview_logo.png"
              alt="Voicereview Logo"
              width={50}
              height={50}
            />
          </div>
          <div className="ml-4">
            <h1 className="text-scale-1200 text-2xl">VoiceReview</h1>
          </div>
        </div>
        <div>
          <p className="text-scale-1100 text-lg mt-4 text-center">
            {view.title + " to start reviewing"}
          </p>
        </div>
      </div>
      <div>
        <Auth
          supabaseClient={supabase}
          view={view.id}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                borderRadius: "0.5rem",
                borderColor: "lightgray",
              },
            },
          }}
          providers={["google"]}
          socialLayout="vertical"
          redirectTo="http://localhost:3000/dashboard"
        />
      </div>
    </div>
  );
}
