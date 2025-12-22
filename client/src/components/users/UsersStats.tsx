import {
  UsersIcon,
  UserPlusIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import UserStatCard from "./UserStatCard";

interface Props {
  total: number;
}

export default function UsersStats({ total }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UserStatCard
        title="Total Users"
        value={total}
        icon={<UsersIcon className="h-5 w-5" />}
      />

      <UserStatCard
        title="New Users"
        value={15}
        icon={<UserPlusIcon className="h-5 w-5" />}
      />

      <UserStatCard
        title="Top Users"
        value={200}
        icon={<StarIcon className="h-5 w-5" />}
      />

      <UserStatCard
        title="Other Users"
        value={total - 200}
        icon={<UserIcon className="h-5 w-5" />}
      />
    </div>
  );
}
