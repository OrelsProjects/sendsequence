"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();

  const login = async () => {
    await signIn("google");
    router.push("home");
  };
  return (
    <div className="flex flex-col items-center h-screen p-8 text-center">
      <button onClick={login}>Google</button>
    </div>
  );
};

export default Auth;
