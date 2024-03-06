import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => {
        const audioBlob = event.data;
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      mediaRecorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = mediaRecorder;
    } catch (err) {
      console.error('Could not start recording', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <section className="my-8">
      <h2 className="text-lg font-semibold mb-4">Laissez un avis vocal</h2>
      <div>
        {isRecording ? (
          <button onClick={stopRecording} className="bg-red-500 text-white p-2 rounded">Arrêter l'enregistrement</button>
        ) : (
          <button onClick={startRecording} className="bg-blue-500 text-white p-2 rounded">Commencer l'enregistrement</button>
        )}
        {audioUrl && <audio src={audioUrl} controls className="mt-4"/>}
      </div>
    </section>
  );
};

export default AudioRecorder;