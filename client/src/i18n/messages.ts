import { Lang } from "./useI18n";

import type { User, UserStatics } from "@/types/user";

type UserColumnKey = Exclude<keyof User, "id">;
type UserStatKey = keyof UserStatics;

export type Translations = {
  usersTitle: string;
  statistics: string;
  addUser: string;

  deleteUserTitle: string;
  deleteUserConfirm: (name: string) => string;

  moreFilters: string;
  closeFilters: string;
  clearFilters: string;

  editUser: string;
  deleteUser: string;
  cancel: string;
  toggleTheme: string;

  sortBy: (label: string) => string;

  table: Record<UserColumnKey, string>;
  stats: Record<UserStatKey, string>;

  searchPlaceholder: string;
  filterByName: string;
  filterByEmail: string;
  allCompanies: string;
  allStatuses: string;
  rangeOf: string;

  pagination: {
    rowsPerPage: string;
    of: string;
  };
};

export const messages: Record<Lang, Translations> = {
  en: {
    usersTitle: "Users",
    statistics: "Statistics",
    addUser: "Add user",

    deleteUserTitle: "Delete user",
    deleteUserConfirm: (name) => `Are you sure you want to delete ${name}?`,

    moreFilters: "Show advanced filters",
    closeFilters: "Hide advanced filters",
    clearFilters: "Clear all filters",

    editUser: "Edit user",
    deleteUser: "Delete user",
    cancel: "Cancel",
    toggleTheme: "Toggle theme",

    sortBy: (label) => `Sort by ${label}`,

    stats: {
      totalUsers: "Total users",
      newUsers: "New users",
      topUsers: "Top users",
      otherUsers: "Other users",
    },

    table: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      company: "Company",
      status: "Status",
    },

    searchPlaceholder: "Search for...",
    filterByName: "Filter by name",
    filterByEmail: "Filter by email",
    allCompanies: "All companies",
    allStatuses: "All statuses",
    rangeOf: "of",

    pagination: {
      rowsPerPage: "Rows per page:",
      of: "of",
    },
  },

  es: {
    usersTitle: "Usuarios",
    statistics: "Estadísticas",
    addUser: "Agregar usuario",

    deleteUserTitle: "Eliminar usuario",
    deleteUserConfirm: (name) => `¿Seguro que querés eliminar a ${name}?`,

    moreFilters: "Mostrar filtros avanzados",
    closeFilters: "Ocultar filtros avanzados",
    clearFilters: "Limpiar todos los filtros",

    editUser: "Editar usuario",
    deleteUser: "Eliminar usuario",
    cancel: "Cancelar",
    toggleTheme: "Cambiar tema",

    sortBy: (label) => `Ordenar por ${label}`,

    stats: {
      totalUsers: "Usuarios totales",
      newUsers: "Usuarios nuevos",
      topUsers: "Usuarios destacados",
      otherUsers: "Otros usuarios",
    },

    table: {
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      company: "Empresa",
      status: "Estado",
    },

    searchPlaceholder: "Buscar...",
    filterByName: "Filtrar por nombre",
    filterByEmail: "Filtrar por email",
    allCompanies: "Todas las empresas",
    allStatuses: "Todos los estados",
    rangeOf: "de",

    pagination: {
      rowsPerPage: "Filas por página:",
      of: "de",
    },
  },
};
