"use client";

import { useState } from "react";
import axios from "axios";

const API_URL =
  "https://synapseos-backend-4v9x.onrender.com";

export default function ChatPanel() {

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {

    try {

      const res = await axios.post(
        `${API_URL}/ask-ai`,
        {
          question
        }
      );

      setResponse(res.data.response);

    } catch {
      setResponse("AI service unavailable");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

      <h2 className="text-2xl font-bold mb-4">
        Ask SynapseOS AI
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about workflows..."
        className="w-full bg-black border border-zinc-700 rounded-xl p-3 mb-4"
      />

      <button
        onClick={askAI}
        className="bg-blue-600 px-5 py-2 rounded-xl"
      >
        Ask AI
      </button>

      {response && (
        <div className="mt-4 text-zinc-300">
          {response}
        </div>
      )}

    </div>
  );
}
