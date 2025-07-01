
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
      "space-y-2 mb-10", 
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mx-auto text-lg max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
