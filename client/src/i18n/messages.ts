import { Lang } from "./useI18n";

export type Translations = {
  moreFilters: string;
  closeFilters: string;
  clearFilters: string;
  editUser: string;
  deleteUser: string;
  sortBy: (label: string) => string;
};

export const messages: Record<Lang, Translations> = {
  en: {
    moreFilters: "Show advanced filters",
    closeFilters: "Hide advanced filters",
    clearFilters: "Clear all filters",
    editUser: "Edit user",
    deleteUser: "Delete user",
    sortBy: (label: string) => `Sort by ${label}`,
  },
  es: {
    moreFilters: "Mostrar filtros avanzados",
    closeFilters: "Ocultar filtros avanzados",
    clearFilters: "Limpiar todos los filtros",
    editUser: "Editar usuario",
    deleteUser: "Eliminar usuario",
    sortBy: (label: string) => `Ordenar por ${label}`,
  },
};
