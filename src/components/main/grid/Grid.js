import {
  checkIsAllType,
  pressObjectToArray,
  shuffleArrayRandom,
} from "../../../utils/utils.js";
import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
} from "../../../store/store.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { useGetAtom } from "../../../store/coil.js";
import { NEWS_COUNT, PRESS_ICON } from "../../../constants/constants.js";
import { getSubscribeButton } from "../../common/subscribe-button/SubscribeButton.js";

const $gridView = _querySelector(".grid-view");
const $gridViewList = _querySelectorAll("li", $gridView);

const randomPressIcons = shuffleArrayRandom(pressObjectToArray(PRESS_ICON));

const renderGrid = () => {
  const currentGridPage = useGetAtom(gridPageState);
  const currentSubGridPage = useGetAtom(subscribeGridPageState);
  const isCurrentDarkMode = useGetAtom(isDarkMode);
  const subscribedList = useGetAtom(subscribeState);
  const isAllType = checkIsAllType();
  const { pressIcons, startIndex, endIndex } = getGridRenderItems(
    isAllType,
    subscribedList,
    currentGridPage,
    currentSubGridPage
  );

  renderItemsToGrid(pressIcons, startIndex, endIndex, isCurrentDarkMode);
};

const getGridRenderItems = (
  isAllType,
  subscribedList,
  currentGridPage,
  currentSubGridPage
) => {
  if (isAllType) {
    const startIndex = currentGridPage * NEWS_COUNT;
    const endIndex = startIndex + NEWS_COUNT;

    return { pressIcons: randomPressIcons, startIndex, endIndex };
  }

  const startIndex = currentSubGridPage * NEWS_COUNT;
  const endIndex = startIndex + NEWS_COUNT;
  const pressIcons = randomPressIcons.filter(({ name }) =>
    subscribedList.includes(name)
  );

  return { pressIcons, startIndex, endIndex };
};

const renderItemsToGrid = (
  pressIcons,
  startIndex,
  endIndex,
  isCurrentDarkMode
) => {
  $gridViewList.forEach((elem) => {
    elem.innerHTML = "";
  });

  if (isCurrentDarkMode) {
    pressIcons.slice(startIndex, endIndex).forEach(({ name, dark }, idx) => {
      $gridViewList[idx].appendChild(getGridContent(name, dark));
    });
  } else {
    pressIcons.slice(startIndex, endIndex).forEach(({ name, light }, idx) => {
      $gridViewList[idx].appendChild(getGridContent(name, light));
    });
  }
};

const getGridContent = (name, src) => {
  const $gridContent = document.createElement("div");
  $gridContent.className = "content";

  const $front = `
    <div class="front">
      <button>
        <img class="grid-cell_news-img" src=${src} alt=${name} />
      </button>
    </div>`;

  const $back = document.createElement("div");
  $back.className = "back";

  const $subscribeButton = getSubscribeButton(name);
  $back.appendChild($subscribeButton);

  $gridContent.innerHTML = $front;
  $gridContent.appendChild($back);

  return $gridContent;
};

export { renderGrid };
