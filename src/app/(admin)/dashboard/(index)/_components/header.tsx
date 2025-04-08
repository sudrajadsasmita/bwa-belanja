"use client";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import FormLogout from "./form-logout";

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header className="flex h-16 w-full items-center justify-between rounded-xl bg-white px-2 lg:justify-end">
      <button
        className="rounded-xl bg-blue-600 p-2 text-white lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={32} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 overflow-hidden rounded-full border border-white bg-blue-500 hover:bg-blue-600"
          >
            <User color="white" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="rounded-xl border border-slate-200 bg-slate-100 text-slate-600"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <FormLogout />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
