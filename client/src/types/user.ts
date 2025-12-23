import type { UserStatus } from "@/constants/userStatus";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  status: UserStatus;
}

export type UserPayload = Omit<User, "id">;

export interface UserStatics {
  totalUsers: number;
  newUsers: number;
  topUsers: number;
  otherUsers: number;
}

export interface UserTypeDistribution {
  type: "Organic" | "Social" | "Direct";
  percentage: number;
}

export interface UserTypesResponse {
  totalUsers: number;
  distribution: UserTypeDistribution[];
}

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  q?: string;
  // filtros
  name_like?: string;
  company_like?: string;
  status?: UserStatus;
  // orden
  sort?: keyof User;
  order?: "asc" | "desc";
}

export interface UserFilters {
  name?: string;
  company?: string;
  status?: UserStatus;
}