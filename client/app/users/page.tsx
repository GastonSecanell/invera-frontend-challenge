"use client";

import { useState } from "react";
import type { Lang } from "@/i18n/useI18n";
import { User } from "@/types/user";

import { useUsers } from "@/hooks/useUsers";
import { useUserStatics } from "@/hooks/useUserStatics";
import { useUserModal } from "@/hooks/useUserModal";
import { useConfirm } from "@/hooks/useConfirm";
import { useToast } from "@/hooks/useToast";
import { useI18n } from "@/i18n/useI18n";
import { useAppMode } from "@/hooks/useAppMode";

import UsersTable from "@/components/users/UsersTable";
import UsersPagination from "@/components/users/UsersPagination";
import UsersStats from "@/components/users/UsersStats";
import UsersStatisticsCard from "@/components/users/UsersStatisticsCard";
import UserModal from "@/components/users/UserModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

import { deleteUser } from "@/services/users.service";

export default function UsersPageContent() {
  const { isDemo } = useAppMode();

  const [lang, setLang] = useState<Lang>("es");
  const t = useI18n(lang);

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
    setFilters,
    onSortChange,
    resetFilters,
    refetch,
  } = useUsers();

  const { statics } = useUserStatics();
  const userModal = useUserModal();
  const confirmDelete = useConfirm<User>();
  const { showToast } = useToast();

  const totalUsers = statics?.totalUsers ?? 0;
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!confirmDelete.payload) return;

    try {
      setDeleting(true);
      await new Promise((r) => setTimeout(r, 800));
      await deleteUser(confirmDelete.payload.id);

      showToast(
        `User "${confirmDelete.payload.name}" deleted successfully`,
        "success"
      );

      confirmDelete.closeConfirm();
      refetch();
    } catch {
      showToast("Failed to delete user", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleModalSubmit = async (data: Omit<User, "id">) => {
    await userModal.submit(data);
    refetch();
  };

  if (loadingGlobal) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner size={48} />
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-4">
        <h1
          className="text-xl font-bold text-[var(--text-primary)]"
          title={t.usersTitle}
        >
          {t.usersTitle}
        </h1>

        <div className="flex items-center gap-2">
          <ThemeToggle title={t.toggleTheme} />

          {isDemo && <LanguageToggle value={lang} onChange={setLang} />}

          <Button
            size="sm"
            className="px-10 font-bold"
            onClick={userModal.openCreate}
            title={t.addUser}
          >
            {t.addUser}
          </Button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      {statics && <UsersStats statics={statics} />}
      <UsersStatisticsCard title={t.statistics} />

      {/* ================= ERROR ================= */}
      {error && <p className="text-sm text-[var(--danger)] mt-2">{error}</p>}

      {/* ================= TABLE ================= */}
      {statics && (
        <>
          <UsersTable
            users={users}
            loading={loadingTable}
            page={page}
            perPage={perPage}
            total={totalUsers}
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
            onResetFilters={resetFilters}
            t={t}
          />

          <div className="w-full flex">
            <UsersPagination
              page={page}
              perPage={perPage}
              total={totalUsers}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
              t={t.pagination}
            />
          </div>
        </>
      )}

      {/* ================= CREATE / EDIT MODAL ================= */}
      <UserModal
        open={userModal.open}
        mode={userModal.mode}
        user={userModal.user}
        loading={userModal.loading}
        error={userModal.error}
        success={userModal.success}
        onClose={userModal.close}
        onSubmit={handleModalSubmit}
      />

      {/* ================= DELETE CONFIRM ================= */}
      <ConfirmModal
        open={confirmDelete.open}
        title={t.deleteUserTitle}
        description={
          confirmDelete.payload
            ? t.deleteUserConfirm(confirmDelete.payload.name)
            : ""
        }
        confirmLabel={t.deleteUser}
        cancelLabel={t.cancel}
        loading={deleting}
        onClose={confirmDelete.closeConfirm}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
