import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useVoiceRecognition() {

  const recognitionRef = useRef<any>(null);

  const [supported] = useState(
    !!(
      window.SpeechRecognition ||
      window.webkitSpeechRecognition
    )
  );

  const [listening, setListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [lastTranscript, setLastTranscript] =
    useState("");

  const [wakeMode, setWakeMode] =
    useState(true);

  useEffect(() => {

    if (!supported) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;

    recognition.onstart = () => {

      setListening(true);

    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event: any) => {

      const text =
        event.results[0][0].transcript;

      const normalized =
        text.toLowerCase();

      if (
        wakeMode &&
        normalized.includes("hey restaurant")
      ) {

        setWakeMode(false);

        setTranscript("");

        return;

      }

      if (
        !wakeMode &&
        text !== lastTranscript
      ) {

        setTranscript(text);

        setLastTranscript(text);

      }

    };

    recognition.onerror = () => {

      setListening(false);

    };

    recognitionRef.current = recognition;

  }, [supported]);

  function startListening() {

    if (!recognitionRef.current) return;

    setTranscript("");

    recognitionRef.current.start();

  }

  function stopListening() {

    recognitionRef.current?.stop();

  }

  return {
    supported,
    listening,
    transcript,
    wakeMode,
    startListening,
    stopListening,
  };

}