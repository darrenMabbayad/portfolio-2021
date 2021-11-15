// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getManifest } from "utils/asyncHandlers";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const manifest = await getManifest();
  res.status(200).json(manifest.Response.jsonWorldComponentContentPaths.en);
}
