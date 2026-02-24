"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitContact } from "@/lib/actions/contact";
import { contactSchema } from "@/lib/schemas/contact";

type ContactResult = Awaited<ReturnType<typeof submitContact>>;

type FieldErrors = Record<"name" | "email" | "message", string | undefined>;

const initialState: ContactResult | null = null;

export function ContactBlock() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    name: undefined,
    email: undefined,
    message: undefined,
  });

  useEffect(() => {
    if (!state) return;
    setFieldErrors({ name: undefined, email: undefined, message: undefined });
    if (state.success) {
      toast.success(state.message ?? "Message sent.");
    } else {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-12 sm:px-6"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="text-2xl font-semibold tracking-tight text-foreground"
      >
        Get in touch
      </h2>
      <p className="mt-2 text-muted-foreground">
        Send a message and I&apos;ll get back to you.
      </p>
      <form
        action={formAction}
        className="mt-8 space-y-6"
        noValidate
        onSubmit={(e) => {
          const form = e.currentTarget;
          const formData = new FormData(form);
          const raw: Record<string, unknown> = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
          };
          const parsed = contactSchema.safeParse(raw);
          if (!parsed.success) {
            e.preventDefault();
            const err = parsed.error.flatten().fieldErrors;
            const errors: FieldErrors = {
              name: err.name?.[0],
              email: err.email?.[0],
              message: err.message?.[0],
            };
            setFieldErrors(errors);
            const msg = [errors.name, errors.email, errors.message]
              .filter(Boolean)
              .join(" ");
            toast.error(msg || "Please fix the fields above.");
            return;
          }
          setFieldErrors({ name: undefined, email: undefined, message: undefined });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className="min-h-[44px]"
            aria-required="true"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-h-[44px]"
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">Message</Label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={2000}
            rows={5}
            className="flex w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring md:text-sm aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          />
          {fieldErrors.message && (
            <p id="contact-message-error" className="text-sm text-destructive" role="alert">
              {fieldErrors.message}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" disabled={isPending} className="min-h-[44px] min-w-[44px]">
          {isPending ? "Sending…" : "Send message"}
        </Button>
      </form>
    </section>
  );
}
