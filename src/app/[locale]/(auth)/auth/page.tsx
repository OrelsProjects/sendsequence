"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { ThemeToggle } from "../../../components/theme-toggle";

const Auth = () => {
  const router = useRouter();

  const login = async () => {
    await signIn("google");
    router.push("home");
  };
  return (
    <div className="flex flex-col items-center h-screen p-8 text-center">
      <Button onClick={login}>Google</Button>
      <ThemeToggle />
    </div>
  );
};

export default Auth;
