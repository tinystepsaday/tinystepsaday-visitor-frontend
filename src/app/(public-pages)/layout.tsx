import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import Providers from "@/components/providers";

export default function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ConditionalNavbar />
      {children}
      <ConditionalFooter />
    </Providers>
  );
}
