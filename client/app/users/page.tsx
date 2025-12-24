"use client";

import { useState, useEffect, useRef } from "react";
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

  const [lang, setLang] = useState<Lang>("en");
  const t = useI18n(lang);

  const {
    users,
    page,
    perPage,
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

  /* ================= DERIVED STATES ================= */

  const hasUsers = Array.isArray(users) && users.length > 0;
  const hasStatics = !!statics;

  const noDataAfterLoad =
    !loadingGlobal &&
    (users == null || users.length === 0) &&
    !statics;

  const isNetworkError =
    typeof error === "string" &&
    /(network|failed to fetch|connection|offline)/i.test(error);

  const isServerDown = noDataAfterLoad && isNetworkError;

  /* ================= TOAST CONTROL ================= */

  const shownNoConnectionToast = useRef(false);

  useEffect(() => {
    if (isServerDown && !shownNoConnectionToast.current) {
      showToast(
        lang === "es"
          ? "No hay conexión con el servidor"
          : "No connection to server",
        "error"
      );
      shownNoConnectionToast.current = true;
    }

    if (!isServerDown) {
      shownNoConnectionToast.current = false;
    }
  }, [isServerDown, lang, showToast]);

  /* ================= ACTIONS ================= */

  const totalUsers = statics?.totalUsers ?? 0;
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!confirmDelete.payload) return;

    try {
      setDeleting(true);
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

  /* ================= RENDER STATES ================= */

  if (loadingGlobal) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner size={48} />
      </div>
    );
  }

  if (isServerDown) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            {t.usersTitle}
          </h1>

          <div className="flex items-center gap-2">
            <ThemeToggle title={t.toggleTheme} />
            {isDemo && <LanguageToggle value={lang} onChange={setLang} />}
          </div>
        </div>

        {/* EMPTY STATE */}
        <div className="mt-10 text-center">
          <p className="text-sm text-red-500 font-medium">
            {lang === "es"
              ? "Sin conexión con el servidor"
              : "No connection to server"}
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            {lang === "es"
              ? "Verificá tu conexión o intentá más tarde"
              : "Please check your connection or try again later"}
          </p>

          <button
            onClick={refetch}
            className="mt-4 text-xs text-blue-500 hover:underline"
          >
            {lang === "es" ? "Reintentar" : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  /* ================= NORMAL RENDER ================= */

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
      {/* HEADER */}
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

          {statics && (
            <Button
              size="sm"
              className="px-10 font-bold"
              onClick={userModal.openCreate}
              title={t.addUser}
            >
              {t.addUser}
            </Button>
          )}
        </div>
      </div>

      {/* STATS */}
      {statics && <UsersStats statics={statics} />}
      {statics && <UsersStatisticsCard title={t.statistics} />}

      {/* EMPTY USERS */}
      {!loadingTable && users.length === 0 && (
        <p className="text-sm text-muted-foreground text-center mt-6">
          {lang === "es" ? "No hay usuarios" : "No users found"}
        </p>
      )}

      {/* TABLE */}
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

          <UsersPagination
            page={page}
            perPage={perPage}
            total={totalUsers}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
            t={t.pagination}
          />
        </>
      )}

      {/* MODALS */}
      <UserModal
        open={userModal.open}
        mode={userModal.mode}
        user={userModal.user}
        loading={userModal.loading}
        error={userModal.error}
        success={userModal.success}
        onClose={userModal.close}
        onSubmit={handleModalSubmit}
        lang={lang}
      />

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
