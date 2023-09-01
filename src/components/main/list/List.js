import {
  categoryState,
  isDarkMode,
  listPageState,
  selectedSubscribeState,
  subscribeListPageState,
} from "../../../store/store.js";
import { useGetAtom } from "../../../store/coil.js";
import { PRESS_ICON } from "../../../constants/constants.js";
import { _querySelector } from "../../../utils/my-query-selector.js";
import { checkIsAllType, checkIsGridView } from "../../../utils/utils.js";
import { getSubscribeButton } from "../../common/subscribe-button/SubscribeButton.js";

const $listView = _querySelector(".list-view_main");

const renderNewsList = (newsList, pressNewsList) => () => {
  const isGridView = checkIsGridView();
  if (isGridView) return;

  const isSubscribeType = !checkIsAllType();
  const currentIsDarkMode = useGetAtom(isDarkMode);
  const currentNewsList = getCurrentNewsList(
    newsList,
    pressNewsList,
    isSubscribeType
  );

  const { press, editTime, img, title, subNews } = currentNewsList;
  const $subscribeButton = getSubscribeButton(press);
  const imgSrc = currentIsDarkMode
    ? PRESS_ICON[press].dark
    : PRESS_ICON[press].light;

  $listView.innerHTML = "";
  $listView.appendChild(getNewsHeader(editTime, imgSrc, $subscribeButton));
  $listView.appendChild(getNewsList(img, title, subNews, press));
};

const getCurrentNewsList = (newsList, pressNewsList, isSubscribeType) => {
  if (isSubscribeType) {
    const currentPage = useGetAtom(subscribeListPageState);
    const currentPress = useGetAtom(selectedSubscribeState);
    return pressNewsList[currentPress][currentPage];
  } else {
    const currentCategory = useGetAtom(categoryState);
    const currentPage = useGetAtom(listPageState);
    return newsList[currentCategory][currentPage];
  }
};

const getNewsHeader = (editTime, imgSrc, $subscribeButton) => {
  const $header = document.createElement("header");

  $header.className = "list-view_main-header";
  $header.innerHTML = ` 
      <img
        src="${imgSrc}"
        height="20px"
      />
      <div>
        <span class="display-medium12">${editTime} 편집</span>
      </div>`;
  $header.appendChild($subscribeButton);

  return $header;
};

const getNewsList = (img, title, subNews, press) => {
  const $listBox = document.createElement("div");

  const newsListContent = subNews.reduce((acc, cur) => {
    return (acc += `<li class="hover-underline available-medium16">${cur}</li>`);
  }, "");

  $listBox.className = "list-view_main-box";
  $listBox.innerHTML = `
      <div class="list-view_main-news">
        <div class="main-news_img-wrapper">
          <img src="${img}" />
        </div>
        <span class="available-medium16">${title}</span>
      </div>
      <ul class="list-view_news-list">
        ${newsListContent}
        <li class="display-medium14">${press} 언론사에서 직접 편집한 뉴스입니다.</li>
      </ul>`;

  return $listBox;
};

export { renderNewsList };
