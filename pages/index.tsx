import useSWR from "swr";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Home from "../components/home";
import Layout from "../components/layout";
import Loading from "../components/loading";
import SignupForm from "../components/signup-form";

import { fetcher } from "../utils/api";
import { User } from "../types/user";
import LoggedOut from "../components/logged-out";

const IndexPage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const { data, error, mutate } = useSWR("/api/me", fetcher);

  if (status === "loading") return <Loading />;

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <div>
        {session ? (
          data === null ? (
            <div>
              <p className="text-2xl mb-8 font-black">
                Welcome {session?.user?.name}!
              </p>
              {loading ? (
                <Loading />
              ) : (
                <SignupForm
                  name={session?.user?.name || ""}
                  setLoading={setLoading}
                  setSuccess={mutate}
                />
              )}
            </div>
          ) : (
            <Home user={data} />
          )
        ) : (
          <LoggedOut />
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
