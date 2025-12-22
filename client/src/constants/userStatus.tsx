export const USER_STATUS_OPTIONS = [
  { value: "Online", label: "Online" },
  { value: "Offline", label: "Offline" },
] as const;

export type UserStatus = (typeof USER_STATUS_OPTIONS)[number]["value"];
