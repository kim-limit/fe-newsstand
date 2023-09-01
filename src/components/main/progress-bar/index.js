import {
  changeActivateCategory,
  changeActivatePress,
  changeCategory,
  changePress,
  initProgress,
  renderProgress,
  updateCurrentPage,
} from "./ProgressBar.js";
import {
  categoryState,
  viewState,
  listPageState,
  subscribeState,
  viewOptionState,
  selectedSubscribeState,
  subscribeListPageState,
} from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/coil.js";
import { newsObjectToArray } from "../../../utils/utils.js";

export const setProgressBar = async (newsList, categoryList) => {
  const pressNewsList = newsObjectToArray(newsList);

  useSubscribeAtom(
    listPageState,
    changeCategory(newsList, categoryList),
    updateCurrentPage(newsList),
    renderProgress
  );

  useSubscribeAtom(
    subscribeListPageState,
    changePress(pressNewsList),
    renderProgress
  );

  useSubscribeAtom(
    categoryState,
    changeActivateCategory(newsList, categoryList)
  );

  useSubscribeAtom(selectedSubscribeState, changeActivatePress);

  useSubscribeAtom(viewState, initProgress);

  useSubscribeAtom(subscribeState, changePress(pressNewsList));

  useSubscribeAtom(
    viewOptionState,
    changeActivateCategory(newsList, categoryList)
  );
};
