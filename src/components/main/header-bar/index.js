import {
  renderHeaderBar,
  setDragSlider,
  renderSubscribePressBar,
  setEvents,
} from "./HeaderBar.js";
import {
  viewState,
  subscribeState,
  viewOptionState,
} from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/coil.js";

export const setHeaderBar = (categoryList) => {
  setDragSlider();
  setEvents();

  useSubscribeAtom(viewState, renderHeaderBar(categoryList));
  useSubscribeAtom(subscribeState, renderSubscribePressBar);
  useSubscribeAtom(viewOptionState, renderHeaderBar(categoryList));
};
