"use client";

import axios from "axios";
import { useState } from "react";

const API_URL =
  "http://localhost:8000";

export default function UploadPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [response, setResponse] =
    useState("");

  const uploadFile = async () => {

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

      const result = await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setResponse(result.data.summary);

    } catch (error) {

      console.log(error);

      setResponse(
        "File upload failed."
      );

    }
  };

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10">
        AI File Analysis
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl space-y-6">

        <input
          type="file"
          onChange={(e) => {

            if (e.target.files?.[0]) {

              setFile(e.target.files[0]);

            }

          }}
          className="block"
        />

        <button
          onClick={uploadFile}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
        >
          Analyze File
        </button>

        {response && (

          <div className="bg-black border border-zinc-700 rounded-xl p-5">

            <h2 className="text-xl font-semibold mb-3 text-blue-400">
              AI Analysis
            </h2>

            <p className="text-zinc-300 whitespace-pre-wrap">
              {response}
            </p>

          </div>

        )}

      </div>

    </main>
  );
}