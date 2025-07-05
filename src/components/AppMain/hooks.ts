import type { AppMainActions, AppMainHooks } from "./types";

export const AppMainCreateHooks = (actions: AppMainActions): AppMainHooks => {
  const afterMount = () => {
    actions.hideMobileMenu();
    actions.hideMobileMenuOnHashChanges();
  };

  return { afterMount };
};
