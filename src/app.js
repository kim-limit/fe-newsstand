import {
  customFetch,
  shuffleArrayRandom,
  shuffleObjectRandom,
} from "./utils/utils.js";
import { useSetAtom } from "./store/coil.js";
import { MyPromise } from "./utils/my-promise.js";
import { subscribeState } from "./store/store.js";
import { CATEGORY_LIST } from "./constants/constants.js";
import { setHeader } from "./components/header/index.js";
import { setGrid } from "./components/main/grid/index.js";
import { setList } from "./components/main/list/index.js";
import { setAlert } from "./components/common/alert/index.js";
import { setHeaderBar } from "./components/main/header-bar/index.js";
import { setSnackBar } from "./components/common/snack-bar/index.js";
import { setProgressBar } from "./components/main/progress-bar/index.js";
import { setNavigateButton } from "./components/main/navigate-button/index.js";
import { setSubscribeButton } from "./components/common/subscribe-button/index.js";
import { setViewToggleButton } from "./components/main/view-toggle-button/index.js";
import { setModeToggleButton } from "./components/main/mode-toggle-button/index.js";
import { setOptionToggleButton } from "./components/main/option-toggle-button/index.js";

(async function init() {
  const subscribeList = await customFetch("../mocks/subscribe.json");
  const headLineData = await customFetch("../mocks/headlines.json");
  const newsList = await customFetch(
    "../mocks/newsList.json",
    shuffleObjectRandom
  );

  const myPromiseSubScribeList = new MyPromise((resolve) =>
    resolve(subscribeList)
  );
  const myPromiseHeadLineData = new MyPromise((resolve) =>
    resolve(headLineData)
  );
  const myPromiseNewsList = new MyPromise((resolve) => resolve(newsList));

  MyPromise.all([
    myPromiseSubScribeList,
    myPromiseHeadLineData,
    myPromiseNewsList,
  ])
    .then((dataList) => {
      const subscribeList = dataList[0];
      const headLineData = dataList[1];
      const newsList = dataList[2];

      const categoryList = shuffleArrayRandom(CATEGORY_LIST);

      useSetAtom(subscribeState, subscribeList);

      setHeader(headLineData);
      setGrid();
      setHeaderBar(categoryList);
      setProgressBar(newsList, categoryList);
      setList(newsList, categoryList);
      setSubscribeButton();
      setNavigateButton();
      setViewToggleButton();
      setModeToggleButton();
      setSnackBar();
      setAlert();
      setOptionToggleButton();
    })
    .catch((error) => console.error(error));
})();
