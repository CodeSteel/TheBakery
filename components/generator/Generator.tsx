import { ReactElement, useEffect, useRef, useState } from "react";
import { BakedImage } from "../../types";
import {
  makeElementClassNameFactory,
  makeRootClassName,
} from "../../utils/classnames";

const ROOT = makeRootClassName("Generator");
const el = makeElementClassNameFactory(ROOT);

export function Generator(): ReactElement {
  const [generationPrompt, setGenerationPrompt] = useState<
    string | undefined
  >();
  const [apiKey, setapiKey] = useState<string | undefined>();
  const [generating, setGenerating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function init() {
      const _apiKey = (await localStorage.getItem("apiKey")) || "[]";
      setapiKey(_apiKey);
    }
    init();

    window.addEventListener("storage", () => {
      if (generating) {
        setGenerating(false);
      }
    });
  }, []);

  const makeRequestCall = async (): Promise<BakedImage | undefined> => {
    if (!generationPrompt || generationPrompt.length === 0) {
      return;
    }

    console.log("Making request call with prompt: " + generationPrompt);

    const response = await fetch("/api/bakery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: generationPrompt, key: apiKey }),
    });

    const json = await response.json();

    if (json.message) {
      console.log(json.message);
      return;
    }

    const bakedImage: BakedImage = {
      url: json.image,
      prompt: json.prompt,
      width: 512,
      height: 512,
    };

    return bakedImage;
  };

  const handleSubmit = (e: any) => {
    e?.preventDefault();

    setGenerating(true);

    makeRequestCall().then((image) => {
      if (!image) {
        return;
      }

      const bakedImages = JSON.parse(
        localStorage.getItem("bakedImages") || "[]"
      ) as BakedImage[];

      bakedImages.push(image);

      localStorage.setItem("bakedImages", JSON.stringify(bakedImages));

      setGenerationPrompt(undefined);
    });
  };

  const handleSaveKey = (e: any) => {
    e?.preventDefault();

    localStorage.setItem("apiKey", apiKey ?? "");
    inputRef.current?.value && (inputRef.current.value = "");
  };

  const handleKeyUpdate = (e: any) => {
    setapiKey(e.target.value);
  };

  const handleUpdateText = (e: any) => {
    setGenerationPrompt(e.target.value);
  };

  return (
    <div className={ROOT}>
      <form onSubmit={handleSaveKey} className={el`form`}>
        <input
          type="password"
          id="prompt"
          name="prompt"
          onChange={handleKeyUpdate}
          placeholder={
            apiKey
              ? "key has been saved to local storage!"
              : "paste your api key here"
          }
          ref={inputRef}
        />
        <button type="submit" className={apiKey ? el`generating` : ""}>
          Save
        </button>
      </form>

      <form onSubmit={handleSubmit} className={el`form`}>
        <input
          type="text"
          id="prompt"
          name="prompt"
          onChange={handleUpdateText}
          placeholder={
            generating
              ? "Please wait for your image to be generated..."
              : "this is the prompt for the image. try something like: a black hole"
          }
        />
        <button type="submit" className={generating ? el`generating` : ""}>
          Generate
        </button>
      </form>
    </div>
  );
}
