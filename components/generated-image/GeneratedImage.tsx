import Image from "next/image";
import { ReactElement } from "react";
import {
  makeElementClassNameFactory,
  makeRootClassName,
} from "../../utils/classnames";

const ROOT = makeRootClassName("GeneratedImage");
const el = makeElementClassNameFactory(ROOT);

export interface GeneratedImageProps {
  image: string;
  prompt: string;
}

export function GeneratedImage(props: GeneratedImageProps): ReactElement {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = props.image;
    a.download = props.prompt;
    a.click();
  };

  return (
    <div className={ROOT}>
      <Image
        className={el`image`}
        src={props.image}
        alt={props.prompt}
        width={500}
        height={500}
        priority={true}
      />
      <div className={el`extras`}>
        <p className={el`prompt`}>{props.prompt}</p>
        <div className={el`buttons`}>
          <button onClick={handleDownload} className={el`button`}>
            Download
          </button>
          <button className={el`button`}>Edit</button>
          <button className={el`button`}>Share</button>
        </div>
      </div>
    </div>
  );
}
