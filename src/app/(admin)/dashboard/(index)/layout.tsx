import { Inter } from "next/font/google";
import ParentLayout from "./_components/parent-layout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { validateSessionToken } from "@/lib/auth";
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
  const token = (await cookies()).get("session")?.value;
  const { session } = await validateSessionToken(String(token));

  if (!session) {
    redirect("/dashboard/sign-in");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentLayout>{children}</ParentLayout>
      </body>
    </html>
  );
}
