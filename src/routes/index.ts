import { type TRoute, html, render } from "iares";
import { DefaultPage, HelloWorldPage } from "@/pages";

export const routes: TRoute[] = [
  {
    regex: /^\/404$/,
    default: "#/404",
    mount: ({ context }) => {
      render(html`<${DefaultPage} />`, context);
    },
  },
  {
    regex: /^#\/$/,
    start: "#/",
    mount: ({ context }) => {
      render(html`<${HelloWorldPage}/>`, context);
    },
  },
];
