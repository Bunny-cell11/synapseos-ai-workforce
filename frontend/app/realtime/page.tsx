"use client";

import { useEffect, useState } from "react";

export default function RealtimePage() {

  const [messages, setMessages] =
    useState<string[]>([]);

  useEffect(() => {

    const socket = new WebSocket(
      "ws://localhost:8000/ws"
    );

    socket.onmessage = (event) => {

      setMessages((prev) => [
        ...prev,
        event.data
      ]);

    };

  }, []);

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">
        Real-Time AI Execution
      </h1>

      <div className="space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-5"
          >

            {msg}

          </div>

        ))}

      </div>

    </main>
  );
}