import Layout from "../components/layout";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div>
        {session ? (
          <>
            <p className="text-2xl">Welcome back, {session?.user?.name}!</p>
          </>
        ) : (
          <>
            <p className="text-2xl">Welcome to StackPaper!</p>
            <p className="text-2xl">Sign in to get started.</p>
          </>
        )}
      </div>
    </Layout>
  );
}
