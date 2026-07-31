import { useCallback, useState } from "react";

export function useSpeechSynthesis() {

  const [speaking, setSpeaking] =
    useState(false);

  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window;

  const speak = useCallback(

    (text: string) => {

      if (!supported) return;

      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(text);

      utterance.lang = "en-US";

      utterance.rate = 1;

      utterance.pitch = 1;

      utterance.onstart = () => {

        setSpeaking(true);

      };

      utterance.onend = () => {
        setSpeaking(false);
        window.dispatchEvent(
        new Event("copilot-finished-speaking")
        );
      };
      window.speechSynthesis.speak(utterance);

    },

    [supported]

  );

  return {

    supported,

    speaking,

    speak,

  };

}