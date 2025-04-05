"use client";
import { Inter } from "next/font/google";
import { useState } from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full w-full flex-col gap-4 bg-blue-600 p-4 lg:flex-row">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} />

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main */}
          <div className="flex w-full flex-col gap-4 lg:w-5/6">
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <main className="flex-grow rounded-xl bg-white p-4 shadow-md">
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
