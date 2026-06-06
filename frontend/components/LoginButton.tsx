"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function LoginButton() {

  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <p>
          {session.user?.name}
        </p>

        <button
          onClick={() => signOut()}
          className="bg-red-600 px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 px-4 py-2 rounded-xl"
    >
      Sign in with Google
    </button>
  );
}