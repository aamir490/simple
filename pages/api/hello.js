// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession({ req, ...authOptions });
  
  res.status(200).json({ name: session });
}
