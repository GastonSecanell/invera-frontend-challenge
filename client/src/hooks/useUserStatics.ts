"use client";

import { useEffect, useState } from "react";
import { fetchStatics } from "@/services/users.service";
import { UserStatics } from "@/types/user";

export function useUserStatics() {
  const [statics, setStatics] = useState<UserStatics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchStatics()
      .then(setStatics)
      .finally(() => setLoading(false));
  }, []);

  return { statics, loading };
}
