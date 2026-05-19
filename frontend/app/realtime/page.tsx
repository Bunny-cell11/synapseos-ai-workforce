"use client";

import { useEffect, useState } from "react";

export default function RealtimePage() {

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    const socket = new WebSocket(
      "ws://localhost:8000/ws"
    );

    socket.onmessage = (event) => {

      setMessage(event.data);

    };

  }, []);

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">
        Real-Time AI Workflows
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl">

        <p>{message}</p>

      </div>

    </main>
  );
}