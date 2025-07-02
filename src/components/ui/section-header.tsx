import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = false, 
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "space-y-2 mt-20 md:mt-20 mb-10",
      centered && "text-center",
      className
    )}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
