import { subscribe } from "../../observer/observer.js";
import { isDarkMode } from "../../store/store.js";
import { setEvents, toggleMode } from "./ModeToggleButton.js";

export const setModeToggleButton = () => {
  subscribe(isDarkMode, toggleMode);

  setEvents();
};
