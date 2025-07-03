import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30 w-full">
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-sm mx-auto">
          <Link href="/" className="text-xl md:text-2xl w-full text-center font-bold gradient-text inline-block mb-8">
            Tiny Steps A Day
          </Link>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        {children}
      </div>
      
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tiny Steps A Day. All rights reserved.
        </p>
      </div>
    </div>
  );
} 