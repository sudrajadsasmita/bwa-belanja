"use client";
import { Menu, ShieldCheck, User } from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <nav
      className={`fixed inset-y-0 left-0 z-50 h-screen w-64 transform bg-white p-4 shadow-lg transition-transform lg:static lg:w-1/3 lg:rounded-xl xl:w-1/4 2xl:w-1/6 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex h-full w-full flex-col gap-8">
        <div className="flex items-center justify-center gap-4 py-4">
          <ShieldCheck size={40} color="blue" />
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
        </div>

        <div className="flex flex-col gap-4">
          <button className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8">
            <Menu size={24} />
            Dashboard
          </button>
          <button className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8">
            <User size={24} />
            Users
          </button>
          <button className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8">
            <Menu size={24} />
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
}
