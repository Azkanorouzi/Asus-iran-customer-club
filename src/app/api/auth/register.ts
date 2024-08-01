// This api route handlers user registaration
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ user: data.user });
}
