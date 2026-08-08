import { cn } from "@/lib/cn";

interface AnnotationProps {
  children: React.ReactNode;
  index?: string;
  className?: string;
}

export function Annotation({ children, index, className }: AnnotationProps) {
  return (
    <span
      className={cn(
        "font-mono text-small font-medium uppercase tracking-[0.08em]",
        "text-grey-600 [[data-tone=dark]_&]:text-grey-300",
        className,
      )}
    >
      {index ? (
        <span className="text-accent [[data-tone=dark]_&]:text-accent-hi">
          {index}
          {" / "}
        </span>
      ) : null}
      {children}
    </span>
  );
}
