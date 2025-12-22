import { apiFetch } from "@/lib/api";
import {
  User,
  UserStatics,
  UserTypesResponse,
  FetchUsersParams,
} from "@/types/user";

/* ================= USERS ================= */

export function fetchUsers(params?: FetchUsersParams) {
  const query = new URLSearchParams();

  if (params?.page) query.set("_page", String(params.page));
  if (params?.limit) query.set("_limit", String(params.limit));
  if (params?.q) query.set("q", params.q);
  if (params?.sort) query.set("_sort", params.sort);
  if (params?.order) query.set("_order", params.order);
  if (params?.status) query.set("status", params.status);

  return apiFetch<User[]>(`/users?${query.toString()}`);
}

export function fetchUserById(id: number) {
  return apiFetch<User>(`/users/${id}`);
}

export function createUser(user: Omit<User, "id">) {
  return apiFetch<User>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function updateUser(id: number, user: Partial<Omit<User, "id">>) {
  return apiFetch<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export function deleteUser(id: number) {
  return apiFetch<void>(`/users/${id}`, {
    method: "DELETE",
  });
}

/* ================= STATICS ================= */

export function fetchStatics() {
  return apiFetch<UserStatics>("/statics");
}

/* ================= USER TYPES (CHART) ================= */

export function fetchUserTypes() {
  return apiFetch<UserTypesResponse>("/userTypes");
}
