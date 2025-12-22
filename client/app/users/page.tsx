"use client";

import { useUsers } from "@/hooks/useUsers";
import { useUserStatics } from "@/hooks/useUserStatics";
import UsersTable from "@/components/users/UsersTable";
import UsersPagination from "@/components/users/UsersPagination";
import UsersStats from "@/components/users/UsersStats";
import UsersStatisticsCard from "@/components/users/UsersStatisticsCard";
import Spinner from "@/components/ui/Spinner";
import { useUserModal } from "@/hooks/useUserModal";
import UserModal from "@/components/users/UserModal";

export default function UsersPage() {
  const {
    users,
    page,
    perPage,
    total,
    q,
    loadingGlobal,
    loadingTable,
    error,
    sortKey,
    sortDir,
    setPage,
    setPerPage,
    setQ,
    onSortChange,
  } = useUsers();

  const userModal = useUserModal();

  const { statics } = useUserStatics();
  if (loadingGlobal) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Users</h1>

        <button
          className="
            h-7
            px-10
            rounded-md
            bg-[var(--accent)]
            text-sm
            font-bold
            text-white
            transition
            hover:bg-[color-mix(in_srgb,var(--accent)_85%,#000)]
          "
          onClick={userModal.openCreate}
        >
          Add user
        </button>
      </div>

      <UserModal
        open={userModal.open}
        mode={userModal.mode}
        user={userModal.user}
        loading={userModal.loading}
        error={userModal.error}
        onClose={userModal.close}
        onSubmit={userModal.submit}
      />

      {statics && <UsersStats statics={statics} />}
      <UsersStatisticsCard />

      {error && <p className="text-sm text-[var(--danger)] mt-2">{error}</p>}

      {statics && (
        <>
          <UsersTable
            users={users}
            loading={loadingTable}
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
            onEdit={userModal.openEdit}
          />

          <div className="w-full flex">
            <UsersPagination
              page={page}
              perPage={perPage}
              total={total}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
