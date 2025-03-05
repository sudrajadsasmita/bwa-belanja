import React from "react";
import FormSignIn from "./_components/forms";

export default function SignInPage() {
  return (
    <main className={"overflow-hidden relative h-screen w-full"}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FormSignIn />
      </div>
    </main>
  );
}
