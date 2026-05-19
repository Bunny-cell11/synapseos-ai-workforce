"use client";

import { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:8000/upload", formData);

    setResult(res.data.analysis);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={upload}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload & Analyze
      </button>

      {result && (
        <p className="mt-3 text-sm text-gray-700">{result}</p>
      )}
    </div>
  );
}