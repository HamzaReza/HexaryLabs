"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { CountrySelect } from "@/components/ui/CountrySelect";
import { cn } from "@/lib/cn";

const fieldBase = cn(
  "bg-base px-4 py-3 text-body text-contrast",
  "placeholder:text-grey-500 transition-colors duration-300 ease-in-out",
  "focus:outline-none",
  "[[data-tone=dark]_&]:bg-contrast-2 [[data-tone=dark]_&]:text-white",
);

const fieldClass = cn(
  fieldBase,
  "w-full border-[0.8px] border-grey-200 focus:border-accent",
  "[[data-tone=dark]_&]:border-grey-700 [[data-tone=dark]_&]:focus:border-accent-hi",
);

const labelClass = cn(
  "mb-2 block text-small text-grey-600",
  "[[data-tone=dark]_&]:text-grey-300",
);

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-small text-accent [[data-tone=dark]_&]:text-accent-hi">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className={cn(
        "w-full justify-center sm:w-auto",
        "disabled:cursor-not-allowed disabled:opacity-60",
      )}
    >
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const fieldErrors = state.fieldErrors ?? {};
  const values = state.values;

  if (state.success) {
    return (
      <div className="border-[0.8px] border-grey-200 bg-base p-8 text-center sm:p-12 [[data-tone=dark]_&]:border-grey-700 [[data-tone=dark]_&]:bg-surface-dark">
        <p className="text-h4">Message sent.</p>
        <p className="mt-2 text-body text-grey-600 [[data-tone=dark]_&]:text-grey-300">
          We&rsquo;ll get back to you within a business day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-base p-6 sm:p-8 [[data-tone=dark]_&]:bg-surface-dark">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            defaultValue={values?.firstName}
            required
            aria-invalid={!!fieldErrors.firstName}
            aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
            className={cn(fieldClass, fieldErrors.firstName && "border-accent")}
          />
          <FieldError id="firstName-error" message={fieldErrors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            defaultValue={values?.lastName}
            required
            aria-invalid={!!fieldErrors.lastName}
            aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
            className={cn(fieldClass, fieldErrors.lastName && "border-accent")}
          />
          <FieldError id="lastName-error" message={fieldErrors.lastName} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="companyEmail" className={labelClass}>
            Company Email
          </label>
          <input
            id="companyEmail"
            name="companyEmail"
            type="email"
            autoComplete="email"
            defaultValue={values?.companyEmail}
            required
            aria-invalid={!!fieldErrors.companyEmail}
            aria-describedby={fieldErrors.companyEmail ? "companyEmail-error" : undefined}
            className={cn(fieldClass, fieldErrors.companyEmail && "border-accent")}
          />
          <FieldError id="companyEmail-error" message={fieldErrors.companyEmail} />
        </div>
        <div>
          <label htmlFor="companyName" className={labelClass}>
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            defaultValue={values?.companyName}
            required
            aria-invalid={!!fieldErrors.companyName}
            aria-describedby={fieldErrors.companyName ? "companyName-error" : undefined}
            className={cn(fieldClass, fieldErrors.companyName && "border-accent")}
          />
          <FieldError id="companyName-error" message={fieldErrors.companyName} />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-grey-500">(optional)</span>
        </label>
        <div
          className={cn(
            "flex border-[0.8px] border-grey-200 bg-base",
            "[[data-tone=dark]_&]:border-grey-700 [[data-tone=dark]_&]:bg-contrast-2",
            "transition-colors duration-300 ease-in-out focus-within:border-accent",
            "[[data-tone=dark]_&]:focus-within:border-accent-hi",
            fieldErrors.phone && "border-accent",
          )}
        >
          <CountrySelect name="phoneCountry" defaultIso={values?.phoneCountry} />
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel-national"
            defaultValue={values?.phone}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={cn(fieldBase, "w-full min-w-0 flex-1")}
          />
        </div>
        <FieldError id="phone-error" message={fieldErrors.phone} />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={values?.message}
          required
          placeholder="What you're building, the core problem, any key constraints, and how did you hear about us?"
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={cn(fieldClass, "resize-y", fieldErrors.message && "border-accent")}
        />
        <FieldError id="message-error" message={fieldErrors.message} />
      </div>

      {state.error && (
        <p role="alert" className="mt-6 border-l-2 border-accent pl-3 text-body text-contrast-2 [[data-tone=dark]_&]:border-accent-hi [[data-tone=dark]_&]:text-white">
          {state.error}
        </p>
      )}

      <div className="mt-8">
        <SubmitButton />
      </div>
    </form>
  );
}
