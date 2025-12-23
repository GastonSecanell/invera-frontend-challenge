import { User } from "@/types/user";

type UserPayload = Omit<User, "id">;

type FormErrors = Partial<Record<keyof UserPayload, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUser(form: UserPayload): {
  valid: boolean;
  errors: FormErrors;
} {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Name is required";

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Invalid email format";
  }

  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.location.trim()) errors.location = "Location is required";
  if (!form.company.trim()) errors.company = "Company is required";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
