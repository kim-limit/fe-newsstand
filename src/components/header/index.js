import { setHeaderLogo } from "./Logo.js";
import { renderRolling } from "./Rolling.js";
import { renderHeaderDate } from "./DateBox.js";

export const setHeader = (headLineData) => {
  setHeaderLogo();

  renderHeaderDate();
  renderRolling(headLineData);
};
