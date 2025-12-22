"use client";

import { useUsers } from "@/hooks/useUsers";
import UsersTable from "@/components/users/UsersTable";
import UsersPagination from "@/components/users/UsersPagination";
import UsersStats from "@/components/users/UsersStats";

export default function UsersPage() {
  const { users, page, perPage, total, loading, error, setPage, setPerPage } =
    useUsers();

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      <UsersStats total={total} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <UsersTable users={users} />
          <UsersPagination
            page={page}
            perPage={perPage}
            total={total}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </>
      )}
    </div>
  );
}
