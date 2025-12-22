import {
  UsersIcon,
  UserPlusIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import UserStatCard from "./UserStatCard";
import { UserStatics } from "@/types/user";

interface Props {
  statics: UserStatics;
}

export default function UsersStats({ statics }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UserStatCard
        title="Total Users"
        value={statics.totalUsers}
        icon={<UsersIcon className="h-5 w-5" />}
      />

      <UserStatCard
        title="New Users"
        value={statics.newUsers}
        icon={<UserPlusIcon className="h-5 w-5" />}
      />

      <UserStatCard
        title="Top Users"
        value={statics.topUsers}
        icon={<StarIcon className="h-5 w-5" />}
      />

      <UserStatCard
        title="Other Users"
        value={statics.otherUsers}
        icon={<UserIcon className="h-5 w-5" />}
      />
    </div>
  );
}
