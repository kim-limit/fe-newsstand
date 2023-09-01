import {
  isDarkMode,
  viewState,
  listPageState,
  subscribeState,
  viewOptionState,
  subscribeListPageState,
} from "../../../store/store.js";
import { renderNewsList } from "./List.js";
import { useSubscribeAtom } from "../../../store/coil.js";
import { newsObjectToArray } from "../../../utils/utils.js";

export const setList = async (newsList) => {
  const pressNewsList = newsObjectToArray(newsList);

  useSubscribeAtom(listPageState, renderNewsList(newsList, pressNewsList));
  useSubscribeAtom(
    subscribeListPageState,
    renderNewsList(newsList, pressNewsList)
  );
  useSubscribeAtom(viewState, renderNewsList(newsList, pressNewsList));
  useSubscribeAtom(isDarkMode, renderNewsList(newsList, pressNewsList));
  useSubscribeAtom(subscribeState, renderNewsList(newsList, pressNewsList));
  useSubscribeAtom(viewOptionState, renderNewsList(newsList, pressNewsList));
};
