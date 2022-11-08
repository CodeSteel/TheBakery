import { Configuration, OpenAIApi } from "openai";

export class OpenAI {
  api: OpenAIApi | undefined;

  constructor(private readonly apiKey: string) {
    const config: Configuration = new Configuration({
      apiKey: this.apiKey,
    });
    const api: OpenAIApi = new OpenAIApi(config);

    this.api = api;
  }

  get openAI() {
    if (!this.api) {
      console.log("OpenAI API not initialized");
      return;
    }
    return this.api;
  }
}
