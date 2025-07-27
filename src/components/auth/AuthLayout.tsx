import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30 w-full">
      <div className="pt-8 pb-4 px-4 md:px-8">
        <div className="max-w-sm mx-auto">
          <Link href="/" className="text-xl md:text-2xl w-full text-center font-bold gradient-text inline-block mb-8">
            Tiny Steps A Day
          </Link>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-4">
        {children}
      </div>
      
      <div className="text-center pt-4 pb-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tiny Steps A Day. All rights reserved.
        </p>
      </div>
    </div>
  );
} 