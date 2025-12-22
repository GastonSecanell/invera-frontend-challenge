import {
  Users,
  UserPlus,
  Star,
  User,
} from "lucide-react";
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
        icon={<Users size={18} />}
      />

      <UserStatCard
        title="New Users"
        value={15}
        icon={<UserPlus size={18} />}
      />

      <UserStatCard
        title="Top Users"
        value={200}
        icon={<Star size={18} />}
      />

      <UserStatCard
        title="Other Users"
        value={total - 200}
        icon={<User size={18} />}
      />
    </div>
  );
}
