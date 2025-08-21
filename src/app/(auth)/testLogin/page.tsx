"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function TestLogin() {
  const { data: session } = useSession();
  console.log(session);
  
  return (
    <main>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )}
    </main>
  );
}
