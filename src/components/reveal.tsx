import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("lux-rise", className)} style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}
