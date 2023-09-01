import { _querySelector } from "../../utils/my-query-selector.js";

const $haederLogo = _querySelector(".container-header_logo");

const setHeaderLogo = () => {
  $haederLogo.addEventListener("click", () => location.reload());
};

export { setHeaderLogo };
