import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { setState } from "../../../observer/observer.js";
import { viewOptionState } from "../../../store/store.js";
import { VIEW_OPTION_TYPE } from "../../../constants/constants.js";

const $mainNavTabs = _querySelector(".main-nav_tabs");
const $modeToggleButtons = _querySelectorAll("button", $mainNavTabs);
const $allButton = $modeToggleButtons[0];
const $subscribeButton = $modeToggleButtons[1];

const handleSubscribeButtonClick = () => {
  setState(viewOptionState, VIEW_OPTION_TYPE.SUBSCRIBE);

  $subscribeButton.className = "main-nav_tabs--selected selected-bold16";
  $allButton.className = "available-medium16";
};

const handleAllButtonClick = () => {
  setState(viewOptionState, VIEW_OPTION_TYPE.ALL);

  $allButton.className = "main-nav_tabs--selected selected-bold16";
  $subscribeButton.className = "available-medium16";
};

const setEvents = () => {
  $allButton.addEventListener("click", handleAllButtonClick);
  $subscribeButton.addEventListener("click", handleSubscribeButtonClick);
};

export { setEvents };