import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { BakedImage } from "../../types";
import {
  makeElementClassNameFactory,
  makeRootClassName,
} from "../../utils/classnames";
import { GeneratedImage } from "../generated-image";

const ROOT = makeRootClassName("Showcase");
const el = makeElementClassNameFactory(ROOT);

export function Showcase(): ReactElement {
  const [bakedImages, setBakedImages] = useState([] as BakedImage[]);

  const getItems = async () => {
    const _bakedImages = (await localStorage.getItem("bakedImages")) || "[]";
    setBakedImages(JSON.parse(_bakedImages) as BakedImage[]);
  };

  useEffect(() => {
    getItems();

    window?.addEventListener("storage", () => {
      getItems();
    });
  }, []);

  return (
    <div className={ROOT}>
      <h1 className={el`title`}>Showcase</h1>
      <div className={el`image-container`}>
        {bakedImages?.map((bakedImage, index) => (
          <div className={el`image-card`} key={index}>
            <GeneratedImage image={bakedImage.url} prompt={bakedImage.prompt} />
          </div>
        ))}
      </div>
    </div>
  );
}
