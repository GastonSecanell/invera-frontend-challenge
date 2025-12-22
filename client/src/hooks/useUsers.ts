"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/users.service";
import { User } from "@/types/user";

export function useUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUsers()
      .then((list) => {
        setAllUsers(list);

        const start = (page - 1) * perPage;
        const end = start + perPage;
        setUsers(list.slice(start, end));
      })
      .catch(() => {
        setError("Error al cargar usuarios");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, perPage]);

  return {
    users,
    page,
    perPage,
    total: allUsers.length,
    loading,
    error,
    setPage,
    setPerPage,
  };
}

