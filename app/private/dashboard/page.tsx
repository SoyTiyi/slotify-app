import { apiServer } from "@/lib/api";
import { usersApiServer } from "@/lib/features/users/users.api";

const Dashboard = async () => {
  const users = usersApiServer(apiServer);
  const me = await users.me();

  return (
    <div>
      <h1 className="text-4xl text-primary font-bold text-center mt-20">Dashboard</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
