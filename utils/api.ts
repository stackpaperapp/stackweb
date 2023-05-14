import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest } from "next";

const secret = process.env.NEXTAUTH_SECRET;

export const get = async (req: NextApiRequest, path: string) => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://penny-pincher-fr7fzzglna-uc.a.run.app"
      : "http://localhost:8080";

  const decoded = await getToken({ req, secret });
  if (!decoded) {
    throw new Error("No token found");
  }

  const token = jwt.sign(decoded, secret);

  const response = await fetch(`${baseURL}/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status == 404) {
    return null;
  }

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const post = async (req: NextApiRequest, path: string) => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://penny-pincher-fr7fzzglna-uc.a.run.app"
      : "http://localhost:8080";

  const decoded = await getToken({ req, secret });
  if (!decoded) {
    throw new Error("No token found");
  }

  const token = jwt.sign(decoded, secret);

  const response = await fetch(`${baseURL}/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: req.body,
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
