import UserStatCard from "./UserStatCard";
import { UserStatics } from "@/types/user";
import { USER_STATS_ICON_MAP } from "@/constants/userStatsIcons";
import { humanizeKey } from "@/utils/humanizeKey";

interface Props {
  statics: UserStatics;
}

export default function UsersStats({ statics }: Props) {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
      {(Object.keys(statics) as (keyof UserStatics)[]).map((key) => (
        <UserStatCard
          key={key}
          title={humanizeKey(key)}
          value={statics[key]}
          icon={USER_STATS_ICON_MAP[key]}
        />
      ))}
    </div>
  );
}
