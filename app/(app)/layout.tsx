import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </AuthGuard>
  );
}
