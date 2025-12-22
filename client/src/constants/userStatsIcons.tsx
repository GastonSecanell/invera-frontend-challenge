import {
  UsersIcon,
  UserIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

export const USER_STATS_ICON_MAP = {
  totalUsers: <UsersIcon className="h-5 w-5 scale-x-[-1]" />,
  newUsers: <UserIcon className="h-5 w-5" />,
  topUsers: <HeartIcon className="h-5 w-5" />,
  otherUsers: <EllipsisHorizontalIcon className="h-5 w-5" />,
} as const;
