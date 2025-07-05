import { store, actions } from "@/store";
import type { AppMainActions } from "./types";

export const appMainCreateActions = (): AppMainActions => {
  const hideMobileMenu = () => {
    actions.hideMenu();
  };
  const hideMobileMenuOnHashChanges = () => {
    window.addEventListener("hashchange", () => {
      actions.hideMenu();
    });
  };
  return { hideMobileMenu, hideMobileMenuOnHashChanges };
};
