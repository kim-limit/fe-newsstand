import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import {
  snackBarMsgState,
  subscribeState,
  viewOptionState,
} from "../../../store/store.js";
import {
  SNACKBAR_MESSAGE,
  VIEW_OPTION_TYPE,
} from "../../../constants/constants.js";
import { checkIsAllType } from "../../../utils/utils.js";
import { useGetAtom, useSetAtom } from "../../../store/coil.js";

const $mainNavTabs = _querySelector(".main-nav_tabs");
const $modeToggleButtons = _querySelectorAll("button", $mainNavTabs);
const $allButton = $modeToggleButtons[0];
const $subscribeButton = $modeToggleButtons[1];

const handleSubscribeButtonClick = () => {
  const currentSubscribState = useGetAtom(subscribeState);

  if (currentSubscribState.length === 0) {
    useSetAtom(snackBarMsgState, SNACKBAR_MESSAGE.NONE);
    return;
  }

  useSetAtom(viewOptionState, VIEW_OPTION_TYPE.SUBSCRIBE);
};

const handleAllButtonClick = () => {
  useSetAtom(viewOptionState, VIEW_OPTION_TYPE.ALL);
};

const changeActivateState = () => {
  const isAllType = checkIsAllType();

  if (isAllType) {
    $allButton.className = "main-nav_tabs--selected selected-bold16";
    $subscribeButton.className = "available-medium16";
  } else {
    $subscribeButton.className = "main-nav_tabs--selected selected-bold16";
    $allButton.className = "available-medium16";
  }
};

const setEvents = () => {
  $allButton.addEventListener("click", handleAllButtonClick);
  $subscribeButton.addEventListener("click", handleSubscribeButtonClick);
};

export { setEvents, changeActivateState };
