import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/hooks/useAuth";
import StarfieldBackground from "@/components/StarfieldBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectMatch — Find Your Dream Team",
  description: "AI-powered team formation for builders, researchers, and founders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground min-h-screen`}>
        <StarfieldBackground />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
