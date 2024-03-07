import AudioRecorder from "@/components/AudioRecorder";
import { supabase } from "@/initSupabase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Document() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleAudioBlob = async (blob : Blob) => {
    setAudioBlob(blob);

    const audioUuid = uuidv4();
    
    try {
      // Asynchronously upload the audio blob to Supabase Storage
      const { data, error } = await supabase.storage
        .from("audio-reviews")
        .upload('public/' + audioUuid + '.ogg', blob, {
          contentType: "audio/ogg; codecs=opus", // Set the content type for the blob
          upsert: false // Set to true if you want to overwrite existing files with the same name
        });

      // Check if there was an error during upload
      if (error) {
        console.error("Upload error:", error.message);
      } else {
        console.log("Upload successful:", data);
      }
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div>
      <AudioRecorder onBlobReady={handleAudioBlob} />
    </div>
  );
}
