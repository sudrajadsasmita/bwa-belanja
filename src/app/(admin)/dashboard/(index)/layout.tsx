import { Inter } from "next/font/google";
import ParentLayout from "./_components/parent-layout";
import { validateSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const token = cookie.get("session");
  const { session } = await validateSessionToken(String(token?.value));
  if (!session) {
    console.log("session not found");

    // return redirect("/dashboard/sign-in");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentLayout>{children}</ParentLayout>
      </body>
    </html>
  );
}
