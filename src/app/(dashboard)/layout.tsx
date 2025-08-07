import AuthGuard from "@/components/auth/AuthGuard";
import TokenManager from "@/components/auth/TokenManager";
import Providers from "@/components/providers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <TokenManager>
      <AuthGuard requireAuth={true}>
        <Providers>
          {children}
        </Providers>
      </AuthGuard>
    </TokenManager>
  );
} 