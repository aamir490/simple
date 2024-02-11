// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";
import connectDb from "../../database/conn";
import Upload from "../../model/uploads";

export default async function handler  (req, res)  {
 await connectDb()
  const image = await Upload.find({})
 console.log('imageFetch', image)
  res.status(200).json({ data:image });
}
