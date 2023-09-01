import { renderSnackBar, setEvents } from "./SnackBar.js";
import { useSubscribeAtom } from "../../../store/coil.js";
import { snackBarMsgState } from "../../../store/store.js";

export const setSnackBar = () => {
  useSubscribeAtom(snackBarMsgState, renderSnackBar);

  setEvents();
};
