import { post } from "../../../utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await post(req, "signup");
  if (user) {
    res.status(200).json(user);
  }

  res.status(404).json(null);
}
