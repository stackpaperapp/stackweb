import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/layout";

export default function IndexPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/me");

      const json = await res.json();
      setUser(json);
    };
    fetchData();
  }, [session]);

  const signup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country, phone }),
    });

    const json = await res.json();
    setUser(json);
  };

  console.log(user);

  return (
    <Layout>
      <div>
        {session ? (
          user == null ? (
            <div>
              <p className="text-2xl mb-4">
                Welcome to StackPaper, {session?.user?.name}!
              </p>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onSelect={(e) => setCountry(e.target.value)}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <p className="text-sm mb-2">
                By clicking "Continue", you accept the terms.
              </p>
              <button className="btn" onClick={signup}>
                Continue
              </button>
            </div>
          ) : (
            <>
              <p className="text-2xl mb-2">
                Welcome back, {session?.user?.name}!
              </p>
            </>
          )
        ) : (
          <>
            <p className="text-2xl mb-2">Welcome to StackPaper!</p>
            <p className="text-2xl">Sign in to get started.</p>
          </>
        )}
      </div>
    </Layout>
  );
}
