import { isDarkMode } from "../../../store/store.js";
import { useGetAtom, useSetAtom } from "../../../store/coil.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $body = _querySelector("body");
const $toggleButton = _querySelector(".darkmode-toggle");
const $modeToggleButton = _querySelector(".darkmode-toggle");
const toggleButtonClassList = $toggleButton.classList;
const toggleMode = () => {
  const currentIsDarkMode = useGetAtom(isDarkMode);

  if (currentIsDarkMode) {
    !toggleButtonClassList.contains("input-checked") &&
      toggleButtonClassList.add("input-checked");

    $body.className = "dark";
  } else {
    toggleButtonClassList.contains("input-checked") &&
      toggleButtonClassList.remove("input-checked");

    $body.className = "";
  }
};

const handleToggleButtonClick = () => {
  const currentMode = useGetAtom(isDarkMode);

  useSetAtom(isDarkMode, !currentMode);
};

const setEvents = () => {
  $modeToggleButton.addEventListener("click", handleToggleButtonClick);
};

export { toggleMode, setEvents };
