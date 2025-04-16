import { validateSessionToken } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("session")?.value;
  const { session, user } = await validateSessionToken(String(token));

  if (session && user.type === UserRole.superadmin) {
    redirect("/dashboard");
  }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
