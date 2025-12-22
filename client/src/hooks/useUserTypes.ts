"use client";

import { useEffect, useState } from "react";
import { fetchUserTypes } from "@/services/users.service";
import { UserTypesResponse } from "@/types/user";

export function useUserTypes() {
  const [data, setData] = useState<UserTypesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUserTypes()
      .then(setData)
      .catch(() => setError("Error loading user types"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
