import { ReactElement } from "react";
import {
  makeElementClassNameFactory,
  makeRootClassName,
} from "../../utils/classnames";
import { Generator } from "../generator";

const ROOT = makeRootClassName("Header");
const el = makeElementClassNameFactory(ROOT);

export function Header(): ReactElement {
  return (
    <div className={ROOT}>
      <div className={el`header-card`}>
        <h1>Welcome to TheBakery!</h1>
        <h2>
          This is an open source web application built with NextJS, React,
          Tailwind, and SASS that allows you to generate images from text
          prompts using OpenAI&apos;s DALL-E API.
        </h2>
        <h2>
          You will need to create an account with OpenAI for this to work. Once
          an account is created, you will need to generate an API key and paste
          it into the input field below.
        </h2>
        <h2>
          Each API key comes with a limit of 1,000 generated images with the
          size of 512x512.
        </h2>
        <h2>
          You can generate an API key{" "}
          <a
            href="https://beta.openai.com/account/api-keys"
            target="_blank"
            rel="noreferrer"
          >
            here.
          </a>
        </h2>
        <h2>
          There is currently a <span className={el`red`}>bug</span> with this,
          please refresh the page a few moments after clicking the GENERATE
          button to see your results.
        </h2>
      </div>
      <Generator />
    </div>
  );
}
