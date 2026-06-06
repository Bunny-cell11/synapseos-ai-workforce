"use client";

import { signIn } from "next-auth/react";

export default function AuthPage() {

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-2xl border border-zinc-800 w-[400px]">

        <h1 className="text-4xl font-bold mb-6 text-center">
          SynapseOS Login
        </h1>

        <p className="text-zinc-400 mb-8 text-center">
          Continue with Google Authentication
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl"
        >
          Sign In With Google
        </button>

      </div>

    </main>
  );
}
