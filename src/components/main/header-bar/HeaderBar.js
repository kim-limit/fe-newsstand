import {
  categoryState,
  subscribeState,
  selectedSubscribeState,
} from "../../../store/store.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { useGetAtom, useSetAtom } from "../../../store/coil.js";
import { CATEGORY_LIST } from "../../../constants/constants.js";
import { checkIsAllType, checkIsGridView } from "../../../utils/utils.js";

const $categoryBarWrapper = _querySelector(".list-view_category-bar");
const $categoryBar = _querySelector("ul", $categoryBarWrapper);
const $slider = _querySelector(".list-view_category-bar");

const renderCategoryBar = (categoryList) => {
  $categoryBar.innerHTML = "";

  categoryList.forEach((category) => {
    const $li = document.createElement("li");
    $li.innerHTML = category;
    $li.className = "hover-underline";

    $categoryBar.appendChild($li);
  });

  const currentCategory = useGetAtom(categoryState) || categoryList[0];

  setCategoryState(currentCategory);
};
const setCategoryState = (category) => {
  useSetAtom(categoryState, category);
};

const renderSubscribePressBar = () => {
  const isAllType = checkIsAllType();
  const isGridView = checkIsGridView();

  if (isAllType || isGridView) return;

  const subscribedList = useGetAtom(subscribeState);
  $categoryBar.innerHTML = "";

  subscribedList.forEach((press) => {
    const $li = document.createElement("li");
    $li.innerHTML = press;
    $li.className = "hover-underline available-medium14 ";

    $categoryBar.appendChild($li);
  });

  const currentSelectedSubState =
    useGetAtom(selectedSubscribeState) || subscribedList[0];

  setSelectedSubState(currentSelectedSubState);
};
const setSelectedSubState = (press) => {
  useSetAtom(selectedSubscribeState, press);
};

const renderHeaderBar = (categoryList) => () => {
  const isListView = !checkIsGridView();
  const isAllType = checkIsAllType();

  isListView && isAllType
    ? renderCategoryBar(categoryList)
    : renderSubscribePressBar();
};

const setDragSlider = () => {
  let isDown = false;
  let startX;
  let scrollLeft;

  $slider.addEventListener("mousedown", ({ pageX }) => {
    isDown = true;
    startX = pageX - $slider.offsetLeft;
    scrollLeft = $slider.scrollLeft;
  });
  $slider.addEventListener("mouseleave", () => {
    isDown = false;
    $slider.classList.remove("grab");
  });
  $slider.addEventListener("mouseup", () => {
    isDown = false;
    $slider.classList.remove("grab");
  });
  $slider.addEventListener("mousemove", ({ pageX }) => {
    if (!isDown) return;
    $slider.classList.add("grab");
    const x = pageX - $slider.offsetLeft;
    const walk = x - startX;
    $slider.scrollLeft = scrollLeft - walk;
  });
};

const handleHeaderClick = ({ target }) => {
  const updateText = target.textContent;
  const currentSubscribeState = useGetAtom(subscribeState);
  const categoryList = CATEGORY_LIST;

  const isAllType = checkIsAllType();

  if (isAllType) {
    categoryList.includes(updateText) && setCategoryState(updateText);
  } else {
    currentSubscribeState.includes(updateText) &&
      setSelectedSubState(updateText);
  }
};
const setEvents = () => {
  $categoryBar.addEventListener("click", handleHeaderClick);
};

export { renderHeaderBar, setDragSlider, renderSubscribePressBar, setEvents };
