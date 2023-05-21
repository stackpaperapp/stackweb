import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest } from "next";
import axios from "axios";
const secret = process.env.NEXTAUTH_SECRET;
const fetcher = (...args) => fetch(...args).then((res) => res.json());

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

  try {
    const response = await axios.get(`${baseURL}/${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
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
  const response = await axios.post(`${baseURL}/${path}`, req.body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export { fetcher };
