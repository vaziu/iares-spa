import { html } from "iares";

const template = () => html`
  <h1> 404 </h1>
  <a href="#/">goback!!!</a>
`;

export const DefaultPage = () => ({
  template,
});
