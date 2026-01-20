import { apiServer } from "@/lib/api";
import { usersApiServer } from "@/lib/features/users/users.api";

const Dashboard = async () => {
  const users = usersApiServer(apiServer);
  const me = await users.me();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
