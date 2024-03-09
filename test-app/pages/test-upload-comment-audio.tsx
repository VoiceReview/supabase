import AudioRecorder from "@/components/AudioRecorder";
import { supabase } from "@/initSupabase";
import { use, useEffect, useState } from "react";

export default function TestUploadAudioComment() {
  const [counter, setCounter] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleUploadTextComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", "This is a test " + counter + " comment.");
    formData.append("type", "text");

    const { data, error } = supabase.functions.invoke("comments/audio/", {
      method: "POST",
      body: formData,
    });

    console.log(data, error);
    setCounter(counter + 1);
  };

  const handleAudioBlob = async (blob: Blob) => {
    setAudioBlob(blob);
  };

  const handleUploadAudioComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!audioBlob) {
      console.error("No audio blob to upload");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("content_type", "audio/ogg; codecs=opus");
    formData.append("type", "audio");

    const { data, error } = supabase.functions.invoke("comments/audio/", {
      method: "POST",
      body: formData,
    });

    console.log(data, error);
  };

  return (
    <div>
      <div>
        <AudioRecorder onBlobReady={handleAudioBlob} />
      </div>
      <button className="bg-red-500" onClick={handleUploadTextComment}>Post text message</button>
      <button onClick={handleUploadAudioComment}>Post audio message</button>
    </div>
  );
}
