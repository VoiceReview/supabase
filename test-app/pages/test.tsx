import { supabase } from "@/initSupabase";
import { use, useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const { data, error } = supabase.functions.invoke("comments/audio/575e0c49-bd61-469c-b56a-9886ab2c7e09", {
        method: "GET",
    })

    console.log(data, error);
  }, []);

  return (
    <div>
      <h1>Test</h1>
      
    </div>
  );
}
