import { useState } from "react";

import type { User } from "../../types/user";

type Props = {
  name: string;
  setLoading: (loading: boolean) => void;
  setSuccess: (user: User) => void;
};

const SignupForm = ({ name, setLoading, setSuccess }: Props) => {
  const [country, setCountry] = useState<string>("US");
  const [phone, setPhone] = useState<string>("");

  const signup = async () => {
    setLoading(true);
    const resp = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ country, name, phone }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    setSuccess(data);
    setLoading(false);
  };

  return (
    <div>
      <p className="text-sm mb-4">
        To finalize your account setup, kindly provide the requested information
        below.
      </p>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Country</span>
        </label>
        <select
          className="select select-bordered max-w-xs font-normal"
          onChange={(e) => {
            setCountry((e.target as HTMLSelectElement).value);
          }}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="MX">Mexico</option>
        </select>
      </div>
      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          placeholder="Phone"
          className="input input-bordered"
          onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
        />
      </div>
      <p className="text-sm my-4">
        By clicking &ldquo;Continue&rdquo;, you accept the terms.
      </p>
      <button className="btn" onClick={signup}>
        Continue
      </button>
    </div>
  );
};

export default SignupForm;
