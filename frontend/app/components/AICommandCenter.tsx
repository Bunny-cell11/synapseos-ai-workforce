"use client";

import { useState } from "react";
import axios from "axios";

const API_URL =
  "https://synapseos-backend-4v9x.onrender.com";

export default function AICommandCenter() {

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

      setResponse(
        "AI service unavailable."
      );
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-3xl font-bold mb-5">
        AI Operations Center
      </h2>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask SynapseOS AI..."
        className="w-full bg-black border border-zinc-700 rounded-xl p-4 h-32"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-blue-600 px-6 py-3 rounded-xl"
      >
        Execute AI Query
      </button>

      {response && (

        <div className="mt-6 bg-black border border-zinc-700 rounded-xl p-4 text-zinc-300">
          {response}
        </div>

      )}

    </div>
  );
}
