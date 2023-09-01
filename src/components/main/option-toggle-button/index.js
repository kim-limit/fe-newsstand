import { useSubscribeAtom } from "../../../store/coil.js";
import { viewOptionState } from "../../../store/store.js";
import { changeActivateState, setEvents } from "./OptionToggleButton.js";

export const setOptionToggleButton = () => {
  setEvents();

  useSubscribeAtom(viewOptionState, changeActivateState);
};
