"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { CountrySelect } from "@/components/ui/CountrySelect";
import {
  FieldError,
  UnderlineField,
  UnderlineFieldRow,
} from "@/components/ui/UnderlineField";
import { cn } from "@/lib/cn";

/**
 * Field order and labels follow the approved design: name pair, company name,
 * company email, optional phone, project brief. Only the presentation changed —
 * the field names, the server action and its validation are untouched.
 */

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      icon={false}
      clip={false}
      disabled={pending}
      className={cn(
        "w-full justify-center sm:w-auto",
        "disabled:cursor-not-allowed disabled:opacity-60",
      )}
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}

const initialState: ContactFormState = { success: false };

export interface ContactFormProps {
  submitLabel: string;
  submitPendingLabel: string;
  successHeading: string;
  successBody: string;
}

export function ContactForm({
  submitLabel,
  submitPendingLabel,
  successHeading,
  successBody,
}: ContactFormProps) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const fieldErrors = state.fieldErrors ?? {};
  const values = state.values;

  if (state.success) {
    return (
      <div className="rounded-lg bg-surface-dark p-6 text-center sm:p-8 lg:p-10">
        <p className="text-h4">{successHeading}</p>
        <p className="mt-2 text-body-lg text-grey-300">{successBody}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-lg bg-surface-dark p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <UnderlineField
          id="firstName"
          name="firstName"
          type="text"
          label="First name"
          autoComplete="given-name"
          defaultValue={values?.firstName}
          required
          error={fieldErrors.firstName}
        />
        <UnderlineField
          id="lastName"
          name="lastName"
          type="text"
          label="Last name"
          autoComplete="family-name"
          defaultValue={values?.lastName}
          required
          error={fieldErrors.lastName}
        />
      </div>

      <UnderlineField
        id="companyName"
        name="companyName"
        type="text"
        label="Company name"
        autoComplete="organization"
        defaultValue={values?.companyName}
        required
        error={fieldErrors.companyName}
        className="mt-8"
      />

      <UnderlineField
        id="companyEmail"
        name="companyEmail"
        type="email"
        label="Company email"
        autoComplete="email"
        defaultValue={values?.companyEmail}
        required
        error={fieldErrors.companyEmail}
        className="mt-8"
      />

      <UnderlineFieldRow
        id="phone"
        label="Phone number (optional)"
        error={fieldErrors.phone}
        className="mt-8"
      >
        <CountrySelect name="phoneCountry" defaultIso={values?.phoneCountry} />
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel-national"
          defaultValue={values?.phone}
          aria-invalid={fieldErrors.phone ? true : undefined}
          aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          className={cn(
            "w-full min-w-0 flex-1 bg-transparent pl-4",
            "text-body-lg text-white focus:outline-none",
            "autofill:[transition:background-color_0s_9999999s]",
            "autofill:[-webkit-text-fill-color:#fff]",
          )}
        />
      </UnderlineFieldRow>

      <div className="mt-8">
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-caption uppercase text-grey-500"
        >
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={values?.message}
          required
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={cn(
            "h-[14.5rem] min-h-[8rem] w-full resize-y rounded-lg border p-4",
            "bg-contrast-2 text-body-lg text-white",
            "transition-colors duration-300 ease-in-out focus:outline-none",
            fieldErrors.message ? "border-accent-hi" : "border-grey-700 focus:border-white",
          )}
        />
        <FieldError id="message-error" message={fieldErrors.message} />
      </div>

      {state.error && (
        <p
          role="alert"
          className="mt-8 border-l-2 border-accent-hi pl-3 text-body text-white"
        >
          {state.error}
        </p>
      )}

      <div className="mt-8">
        <SubmitButton label={submitLabel} pendingLabel={submitPendingLabel} />
      </div>
    </form>
  );
}
