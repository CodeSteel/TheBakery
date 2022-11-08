import type { NextApiRequest, NextApiResponse } from "next";
import { Generate } from "../../external/dalle";
import { OpenAI } from "../../external/dalle";

type Data = {
  prompt: string;
  image?: string;
  message?: string;
};

let openAI: OpenAI | undefined;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prompt = req.body.prompt;
  const key = req.body.key;

  if (!key) {
    res.status(400).json({ prompt, image: undefined, message: "No key" });
    return;
  }

  if (!openAI) {
    openAI = new OpenAI(key || "");
  }

  if (!prompt || prompt.length === 0) {
    res
      .status(400)
      .json({ prompt: "", image: undefined, message: "No prompt" });
    return;
  }

  Generate(openAI, prompt).then((image) => {
    res.status(200).json({ prompt, image });
  });
}
