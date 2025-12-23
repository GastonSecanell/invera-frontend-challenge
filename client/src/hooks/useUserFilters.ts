"use client";

import { useEffect, useState } from "react";
import { fetchUserFilters } from "@/services/users.service";

export function useUserFilters() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserFilters()
      .then(({ companies, statuses }) => {
        setCompanies(companies);
        setStatuses(statuses);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    companies,
    statuses,
    loading,
  };
}
