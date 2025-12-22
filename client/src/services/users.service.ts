import { apiFetch } from "@/lib/api";
import { User } from "@/types/user";


export function fetchUsers() {
  return apiFetch<User[]>("/users");
}