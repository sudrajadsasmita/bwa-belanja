"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ActionResult } from "@/types";
import { useActionState } from "react";
import { LogOut } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

export default function FormLogout() {
  const [state, formAction] = useActionState(LogOut, initialState);
  return (
    <DropdownMenuItem>
      <form action={formAction}>
        <button>Logout</button>
      </form>
    </DropdownMenuItem>
  );
}
