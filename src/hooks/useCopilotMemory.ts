import { useState } from "react";

export interface CopilotMemory {

  lastQuestion: string;

  lastAnswer: string;

  topic: string;

}

export function useCopilotMemory() {

  const [memory, setMemory] =

    useState<CopilotMemory | null>(null);

  function remember(

    question: string,

    answer: string,

    topic: string

  ) {

    setMemory({

      lastQuestion: question,

      lastAnswer: answer,

      topic,

    });

  }

  return {

    memory,

    remember,

  };

}