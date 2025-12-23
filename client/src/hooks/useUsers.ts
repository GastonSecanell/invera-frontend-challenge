"use client";

import { useEffect, useRef, useState } from "react";
import { fetchUsers } from "@/services/users.service";
import { User, UserFilters } from "@/types/user";

import type { UserStatus } from "@/constants/userStatus";

type SortDir = "asc" | "desc";
type SortKey = keyof User;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  // paginado
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  // búsqueda global
  const [q, setQ] = useState("");

  // filtros específicos
  const [filters, setFilters] = useState<UserFilters>({
    name: "",
    company: "",
    status: undefined,
  });

  // orden
  const [sortKey, setSortKey] = useState<SortKey | undefined>();
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // estados UI
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    const isTableInteraction = !isFirstLoad.current;

    if (isTableInteraction) {
      setLoadingTable(true);
    } else {
      setLoadingGlobal(true);
    }

    setError(null);

    const timeout = setTimeout(() => {
      fetchUsers({
        page,
        limit: perPage,
        q: q || undefined,

        name_like: filters.name || undefined,
        company_like: filters.company || undefined,
        status: filters.status || undefined,

        sort: sortKey,
        order: sortDir,
      })
        .then((list) => {
          setUsers(list);

          // total fake (json-server style)
          if (page === 1 && list.length < perPage) {
            setTotal(list.length);
          } else {
            setTotal((prev) => Math.max(prev, page * perPage));
          }
        })
        .catch(() => {
          setError("Error al cargar usuarios");
        })
        .finally(() => {
          setLoadingGlobal(false);
          setLoadingTable(false);
          isFirstLoad.current = false;
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, perPage, q, filters, sortKey, sortDir]);

  // reset page cuando cambian filtros o search
  useEffect(() => {
    setPage(1);
  }, [q, filters]);

  const onSortChange = (key: SortKey) => {
    setPage(1);
    setSortKey(key);
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return {
    users,
    page,
    perPage,
    total,
    q,
    filters,
    loadingGlobal,
    loadingTable,
    error,
    sortKey,
    sortDir,
    setPage,
    setPerPage,
    setQ,
    setFilters,
    onSortChange,
  };
}
