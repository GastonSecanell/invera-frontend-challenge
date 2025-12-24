"use client";

import { useAppMode } from "@/hooks/useAppMode";
import { DEMO_AVATARS } from "@/utils/demoAvatars";

type Props = {
  name: string;
  userId: number;
  size?: number;
};

export default function UserAvatar({
  name,
  userId,
  size = 32,
}: Props) {
  const { isDemo, ready } = useAppMode();
  if (!ready) return null;

  const avatarSrc = isDemo
    ? DEMO_AVATARS[userId % DEMO_AVATARS.length]
    : null;

  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="bg-slate-700 h-full w-full flex items-center justify-center text-sm font-medium text-white">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}
