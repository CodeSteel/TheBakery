import { ReactElement } from "react";
import {
  makeElementClassNameFactory,
  makeRootClassName,
} from "../../utils/classnames";
import { Footer } from "../footer";
import { Generator } from "../generator";
import { Header } from "../header";
import { Showcase } from "../showcase";

const ROOT = makeRootClassName("Home");
const el = makeElementClassNameFactory(ROOT);

export function Home(): ReactElement {
  return (
    <div className={ROOT}>
      <Header />
      <Showcase />
    </div>
  );
}
