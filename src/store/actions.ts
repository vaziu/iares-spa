import type { ActionType, StoreActions } from "./types";

export const createActions: ActionType = (store): StoreActions => {
  const toggleMenu = () => {
    store.setState({
      ...store.state,
      menuIsVisible: !store.state.menuIsVisible,
    });
  };

  const hideMenu = () => {
    store.setState({
      ...store.state,
      menuIsVisible: false,
    });
  };

  return {
    toggleMenu,
    hideMenu,
  };
};
