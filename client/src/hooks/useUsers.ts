"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/users.service";
import { User } from "@/types/user";

type SortDir = "asc" | "desc";
type SortKey = keyof User;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | undefined>();
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      fetchUsers({
        page,
        limit: perPage,
        q: q || undefined,
        sort: sortKey,
        order: sortDir,
      })
        .then((list) => {
          setUsers(list);

          if (page === 1 && list.length < perPage) {
            setTotal(list.length);
          } else {
            setTotal((prev) => Math.max(prev, page * perPage + 1));
          }
        })
        .catch(() => {
          setError("Error al cargar usuarios");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, perPage, sortKey, sortDir, q]);

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
    loading,
    error,
    sortKey,
    sortDir,
    setPage,
    setPerPage,
    setQ,
    onSortChange,
  };
}
