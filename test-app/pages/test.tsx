import { supabase } from "@/initSupabase";
import { use, useEffect, useState } from "react";

export default function Test() {
  const [functionPath, setFunctionPath] = useState<string>("");
  const [method, setMethod] = useState<
    "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  >("GET");

  async function invokeFunction() {
    const { data, error } = await supabase.functions.invoke(functionPath, {
      method: method,
    });

    console.log(data, error);
  }

  return (
    <div className="flex flex-col items-center">
      <textarea
        className="w-full h-32 p-2"
        value={functionPath}
        onChange={(e) => setFunctionPath(e.target.value)}
      />
      <select
        className="p-2 my-5"
        value={method}
        onChange={(e) => setMethod(e.target.value as any)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </select>
      <button
        className="p-2 bg-slate-500 rounded"
        onClick={() => {
          invokeFunction();
        }}
      >
        Invoke
      </button>
    </div>
  );
}
