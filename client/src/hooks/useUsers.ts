"use client";

import { useEffect, useRef, useState } from "react";
import { fetchUsers, fetchUsersTotal } from "@/services/users.service";
import { User, UserFilters } from "@/types/user";

type SortDir = "asc" | "desc";
type SortKey = keyof User;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const [q, setQ] = useState("");

  const [filters, setFilters] = useState<UserFilters>({
    name: "",
    email: "",
    company: "",
    status: undefined,
  });

  const [sortKey, setSortKey] = useState<SortKey | undefined>();
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsersTotal({
        q: q || undefined,
        name_like: filters.name || undefined,
        company_like: filters.company || undefined,
        email_like: filters.email || undefined, 
        status: filters.status || undefined,
      })
        .then((count) => setTotal(count))
        .catch(() => setTotal(0));
    }, 250);

    return () => clearTimeout(timeout);
  }, [q, filters]);

  const loadUsers = async (mode: "auto" | "manual" = "auto") => {
    const isTableInteraction =
      mode === "manual" ? true : !isFirstLoad.current;

    if (isTableInteraction) setLoadingTable(true);
    else setLoadingGlobal(true);

    setError(null);

    try {
      const list = await fetchUsers({
        page,
        limit: perPage,
        q: q || undefined,
        name_like: filters.name || undefined,
        email_like: filters.email || undefined,
        company_like: filters.company || undefined,
        status: filters.status || undefined,
        sort: sortKey,
        order: sortDir,
      });

      setUsers(list);
    } catch {
      setError("Error al cargar usuarios");
    } finally {
      setLoadingGlobal(false);
      setLoadingTable(false);
      isFirstLoad.current = false;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadUsers("auto");
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, perPage, q, filters, sortKey, sortDir]);

  useEffect(() => {
    setPage(1);
  }, [q, filters]);

  const onSortChange = (key: SortKey) => {
    setPage(1);
    setSortKey(key);
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const resetFilters = () => {
    setQ("");
    setFilters({ name: "", company: "", status: undefined });
    setSortKey(undefined);
    setSortDir("asc");
    setPage(1);
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
    resetFilters,
    refetch: () => loadUsers("manual"),
  };
}
