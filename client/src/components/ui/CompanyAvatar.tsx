"use client";

import { useAppMode } from "@/hooks/useAppMode";
import { DEMO_COMPANY_LOGOS } from "@/utils/demoCompanyLogos";

type Props = {
  company: string;
  size?: number;
};

export default function CompanyAvatar({
  company,
  size = 24,
}: Props) {
  const { isDemo, ready } = useAppMode();
  if (!ready) return null;

  const logo = isDemo
    ? DEMO_COMPANY_LOGOS[company] ?? null
    : null;

  return (
    <div
      className="
        rounded-full
        flex items-center justify-center
        overflow-hidden
        bg-[var(--bg-hover)]
      "
      style={{ width: size, height: size }}
      title={company}
    >
      {logo ? (
        <img
          src={logo}
          alt={company}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <span className="text-[10px] font-semibold text-[var(--text-primary)]">
          {company.charAt(0)}
        </span>
      )}
    </div>
  );
}
