import React from "react";
import FormSignIn from "./_components/forms";

export default function SignInPage() {
  return (
    <main className={"overflow-hidden relative h-screen w-full"}>
      <div className="flex items-center justify-center h-full px-2">
        <FormSignIn />
      </div>
    </main>
  );
}
