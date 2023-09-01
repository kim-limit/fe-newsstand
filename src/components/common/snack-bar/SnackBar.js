import { useGetAtom } from "../../../store/coil.js";
import { snackBarMsgState } from "../../../store/store.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $snackBar = _querySelector(".snackbar");
const classList = $snackBar.classList;
const $snackBarInner = _querySelector(".snackbar-body", $snackBar);
const $snackBarProgress = _querySelector(".snackbar-progress", $snackBar);

const renderSnackBar = () => {
  const content = useGetAtom(snackBarMsgState);
  const isInvisible = $snackBar.classList.contains("invisible");

  $snackBarInner.textContent = content;

  if (isInvisible) {
    invisibleToVisible();
  } else {
    visibleToInvisible();
    requestAnimationFrame(invisibleToVisible);
  }
};

const visibleToInvisible = () => {
  classList.replace("visible", "invisible");
};
const invisibleToVisible = () => {
  classList.replace("invisible", "visible");
};

const setEvents = () => {
  $snackBar.addEventListener("click", visibleToInvisible);
  $snackBarProgress.addEventListener("animationend", visibleToInvisible);
};

export { renderSnackBar, setEvents };
