import type { User } from "../../types/user";

type Props = {
  user?: User;
};

const Home = ({ user }: Props) => {
  return (
    <div>
      <p className="text-2xl mb-2 font-black">Welcome back, {user?.name}!</p>
      <p>You can create a budget soon.</p>
    </div>
  );
};

export default Home;
