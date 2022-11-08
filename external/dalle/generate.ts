import { OpenAI } from "./openai";

export async function Generate(
  openAI: OpenAI,
  prompt: string
): Promise<string | undefined> {
  const openAIInstance = openAI.openAI;
  if (!openAIInstance) {
    console.log("OpenAI API not initialized");
    return;
  } else {
    console.log("OpenAI API initialized");
  }

  const result = await openAIInstance.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: "steel",
  });

  const url: string | undefined = result.data.data[0].url;

  return url;
}
