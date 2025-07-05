import { css, html } from "iares";

const template = () => html`
  <div class="wrap-ctx">
    <h1>Hello IARES!!!</h1>
    <p>The library for fast web, mobile, and desktop app development.</p>
  </div>
`;

export const HelloWorldPage = () => ({ template, styles });

const styles = () => css`
  hello-world-page {
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap: wrap;

    width:100vw;
    height:100vh;
  }

  .wrap-ctx > h1,
  .wrap-ctx > p {
    display:flex;
    width:100%;
    height:75px;
    justify-content: center;
  }
`;
