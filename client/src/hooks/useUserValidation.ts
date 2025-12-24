import { User } from "@/types/user";
import type { Translations } from "@/i18n/messages";

type UserPayload = Omit<User, "id">;
type FormErrors = Partial<Record<keyof UserPayload, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUser(
  form: UserPayload,
  t: Translations
): {
  valid: boolean;
  errors: FormErrors;
} {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = t.formErrors.required;

  if (!form.email.trim()) {
    errors.email = t.formErrors.required;
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = t.formErrors.invalidEmail;
  }

  if (!form.phone.trim()) errors.phone = t.formErrors.required;
  if (!form.location.trim()) errors.location = t.formErrors.required;
  if (!form.company.trim()) errors.company = t.formErrors.required;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
