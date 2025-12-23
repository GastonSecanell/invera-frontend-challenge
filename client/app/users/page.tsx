"use client";

import { useUsers } from "@/hooks/useUsers";
import { useUserStatics } from "@/hooks/useUserStatics";
import { useUserModal } from "@/hooks/useUserModal";
import { useConfirm } from "@/hooks/useConfirm";

import UsersTable from "@/components/users/UsersTable";
import UsersPagination from "@/components/users/UsersPagination";
import UsersStats from "@/components/users/UsersStats";
import UsersStatisticsCard from "@/components/users/UsersStatisticsCard";
import UserModal from "@/components/users/UserModal";

import ConfirmModal from "@/components/ui/ConfirmModal";
import Spinner from "@/components/ui/Spinner";

import { deleteUser } from "@/services/users.service";
import { User } from "@/types/user";
import { useState } from "react";

export default function UsersPage() {
  /* =========================
   * HOOKS
   * ========================= */
  const {
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
    onSortChange,
    setFilters,
  } = useUsers();

  const { statics } = useUserStatics();
  const userModal = useUserModal();
  const confirmDelete = useConfirm<User>();

  const [deleting, setDeleting] = useState(false);

  /* =========================
   * HANDLERS
   * ========================= */
  const handleDeleteConfirm = async () => {
    if (!confirmDelete.payload) return;

    try {
      setDeleting(true);

      // fake delay para UX
      await new Promise((r) => setTimeout(r, 800));
      await deleteUser(confirmDelete.payload.id);

      confirmDelete.closeConfirm();
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  /* =========================
   * LOADING GLOBAL
   * ========================= */
  if (loadingGlobal) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner size={48} />
      </div>
    );
  }

  /* =========================
   * RENDER
   * ========================= */
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Users</h1>

        <button
          onClick={userModal.openCreate}
          className="
            h-8 px-10 rounded-md
            bg-[var(--accent)]
            text-sm font-bold text-white
            transition
            hover:bg-[color-mix(in_srgb,var(--accent)_85%,#000)]
          "
        >
          Add user
        </button>
      </div>

      {/* STATS */}
      {statics && <UsersStats statics={statics} />}
      <UsersStatisticsCard />

      {/* ERROR */}
      {error && <p className="text-sm text-[var(--danger)] mt-2">{error}</p>}

      {/* TABLE + PAGINATION */}
      {statics && (
        <>
          <UsersTable
            users={users}
            loading={loadingTable}
            page={page}
            perPage={perPage}
            total={statics.totalUsers}
            search={q}
            filters={filters}
            onSearchChange={(v) => {
              setPage(1);
              setQ(v);
            }}
            onFiltersChange={setFilters}
            sortKey={sortKey}
            sortDir={sortDir}
            onSortChange={onSortChange}
            onEdit={userModal.openEdit}
            onDelete={(u) => confirmDelete.openConfirm(u)}
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

      {/* CREATE / EDIT */}
      <UserModal
        open={userModal.open}
        mode={userModal.mode}
        user={userModal.user}
        loading={userModal.loading}
        error={userModal.error}
        success={userModal.success}
        onClose={userModal.close}
        onSubmit={userModal.submit}
      />

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={confirmDelete.open}
        title="Delete user"
        description={`Are you sure you want to delete ${confirmDelete.payload?.name}?`}
        loading={deleting}
        onClose={confirmDelete.closeConfirm}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
