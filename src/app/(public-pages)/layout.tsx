import ConditionalNavbar from "@/components/ConditionalNavbar"; 
import ConditionalFooter from "@/components/ConditionalFooter";

export default function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ConditionalNavbar />
      {children}
      <ConditionalFooter />
    </>
  );
}
