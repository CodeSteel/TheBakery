const PREFIX = "steel-";
const ELEMENT_SEPARATOR = "__";

export function makeRootClassName(name: string): string {
  return `${PREFIX}${name}`;
}

export function makeElementClassNameFactory(root: string) {
  return (strings: TemplateStringsArray): string =>
    `${root}${ELEMENT_SEPARATOR}${strings[0]}`;
}
