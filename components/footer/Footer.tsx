import { ReactElement } from "react";
import {
  makeElementClassNameFactory,
  makeRootClassName,
} from "../../utils/classnames";

const ROOT = makeRootClassName("Footer");
const el = makeElementClassNameFactory(ROOT);

export function Footer(): ReactElement {
  return (
    <footer className={ROOT}>
      <p className={el`love-text`}>
        Made with ❤️ by{" "}
        <a
          href="https://codesteel-io.vercel.app"
          target="_blank"
          rel="noreferrer"
          className={el`love-link`}
        >
          Isaac.
        </a>
      </p>
    </footer>
  );
}
