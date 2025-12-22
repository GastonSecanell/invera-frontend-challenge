"use client";

import { useUsers } from "@/hooks/useUsers";
import { useUserStatics } from "@/hooks/useUserStatics";
import UsersTable from "@/components/users/UsersTable";
import UsersPagination from "@/components/users/UsersPagination";
import UsersStats from "@/components/users/UsersStats";
import UsersStatisticsCard from "@/components/users/UsersStatisticsCard";

export default function UsersPage() {
  const {
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
  } = useUsers();

  const { statics } = useUserStatics();

  return (
    <div className="p-6 m-4 mx-6">
      <h1 className="text-xl font-bold text-white mb-4">Users</h1>

      {statics && <UsersStats statics={statics} />}
      <UsersStatisticsCard />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && statics && (
        <>
           <UsersTable
            users={users}
            page={page}
            perPage={perPage}
            total={statics.totalUsers}
            search={q}
            onSearchChange={(v) => {
              setPage(1);
              setQ(v);
            }}
            sortKey={sortKey}
            sortDir={sortDir}
            onSortChange={onSortChange}
          />

          <UsersPagination
            page={page}
            perPage={perPage}
            total={statics.totalUsers}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </>
      )}
    </div>
  );
}
