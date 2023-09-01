import {
  toggleNavigateButtonDisplay,
  setEvents,
  setGridButtonDisplay,
} from "./NavigateButton.js";
import {
  gridPageState,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
  viewState,
} from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/coil.js";

export const setNavigateButton = () => {
  setEvents();

  useSubscribeAtom(gridPageState, setGridButtonDisplay);
  useSubscribeAtom(viewOptionState, setGridButtonDisplay);
  useSubscribeAtom(subscribeGridPageState, setGridButtonDisplay);
  useSubscribeAtom(subscribeState, setGridButtonDisplay);
  useSubscribeAtom(viewState, toggleNavigateButtonDisplay);
};
