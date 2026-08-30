import { cn } from "@/lib/cn";

/**
 * The form field of the approved design: no box, just a rule under the value
 * with a mono-uppercase label that rests on the value's baseline and floats to
 * the top of the field once it is focused or filled.
 *
 * Geometry measured from the Contact frame at 1440 — 14/18 mono label, 18px
 * value, 24px of float headroom above it, 16px down to a 1px rule, so the field
 * box is 65px and fields sit on a 96px pitch (32px apart).
 *
 * The float is CSS-only: `placeholder=" "` makes `:placeholder-shown` mean
 * "empty", so no state and no client component are needed. The resting rule is
 * written as an arbitrary variant rather than the built-in
 * `peer-placeholder-shown:` because it has to also exclude `:focus`, and
 * relying on two same-specificity variants resolving in the right source order
 * would be fragile.
 */

const RULE = cn(
  "border-b border-grey-500",
  "transition-colors duration-300 ease-in-out",
);

const LABEL = cn(
  "pointer-events-none absolute left-0 top-0",
  "font-mono text-caption uppercase text-grey-500",
  "transition-[transform,color] duration-300 ease-in-out",
);

/** Resting position — 30px down puts the label on the value's baseline. */
const LABEL_RESTING = "peer-[&:placeholder-shown:not(:focus)]:translate-y-[1.875rem]";

const CONTROL = cn(
  "w-full appearance-none bg-transparent pt-6 pb-4",
  "text-body-lg text-white placeholder:text-transparent",
  "focus:outline-none",
  /* Autofill paints its own opaque background, which on a transparent field
     over a dark panel reads as a broken white box. The long transition is the
     only reliable way to suppress it. */
  "autofill:[transition:background-color_0s_9999999s]",
  "autofill:[-webkit-text-fill-color:#fff]",
);

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-caption text-accent-hi">
      {message}
    </p>
  );
}

interface UnderlineFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder" | "id"> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

export function UnderlineField({
  id,
  label,
  error,
  className,
  ...rest
}: UnderlineFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "peer",
          CONTROL,
          RULE,
          error ? "border-accent-hi" : "focus:border-white",
        )}
        {...rest}
      />
      <label htmlFor={id} className={cn(LABEL, LABEL_RESTING, "peer-focus:text-grey-300")}>
        {label}
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/**
 * Same rule and label treatment for a field whose control is not a bare input —
 * the phone row, where a country select sits beside the number. The label is
 * always in its floated position because the row is never visually empty.
 */
export function UnderlineFieldRow({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center pt-6 pb-4",
          RULE,
          error ? "border-accent-hi" : "focus-within:border-white",
        )}
      >
        {children}
      </div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
