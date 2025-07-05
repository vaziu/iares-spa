import { css, html } from "iares";

export const template = () => html`
  <div class="wrap-ctx">
    <router-view></router-view>
  </div>
`;

export const AppMain = () => {
  return {
    template,
    styles,
  };
};

const styles = () => css`
  app-main,
  .wrap-ctx {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height:auto;
  }
`;
