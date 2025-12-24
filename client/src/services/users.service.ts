import { apiFetch } from "@/lib/api";
import {
  User,
  UserStatics,
  UserTypesResponse,
  FetchUsersParams,
} from "@/types/user";

export function fetchUsers(params?: FetchUsersParams) {
  const query = new URLSearchParams();

  if (params?.page) query.set("_page", String(params.page));
  if (params?.limit) query.set("_limit", String(params.limit));
  if (params?.q) query.set("q", params.q);

  if (params?.name_like) query.set("name_like", params.name_like);
  if (params?.email_like) query.set("email_like", params.email_like);
  if (params?.company_like) query.set("company_like", params.company_like);
  if (params?.status) query.set("status", params.status);

  if (params?.sort) query.set("_sort", String(params.sort));
  if (params?.order) query.set("_order", params.order);

  return apiFetch<User[]>(`/users?${query.toString()}`);
}

/** Total “calculado” desde front: trae todos los matches y hace length */
export async function fetchUsersTotal(
  params?: Omit<FetchUsersParams, "page" | "limit">
) {
  const query = new URLSearchParams();

  if (params?.q) query.set("q", params.q);
  if (params?.name_like) query.set("name_like", params.name_like);
  if (params?.email_like) query.set("email_like", params.email_like);
  if (params?.company_like) query.set("company_like", params.company_like);
  if (params?.status) query.set("status", params.status);

  return apiFetch<User[]>(`/users?${query.toString()}`).then(
    (list) => list.length
  );
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

export function fetchStatics() {
  return apiFetch<UserStatics>("/statics");
}

export function fetchUserTypes() {
  return apiFetch<UserTypesResponse>("/userTypes");
}

export async function fetchUserFilters(): Promise<{
  companies: string[];
  statuses: string[];
}> {
  const users = await apiFetch<User[]>("/users");

  const companies = Array.from(
    new Set(users.map((u) => u.company).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const statuses = Array.from(
    new Set(users.map((u) => u.status).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return { companies, statuses };
}

