import { atom, selector } from "./coil.js";
import { VIEW_OPTION_TYPE, VIEW_TYPE } from "../constants/constants.js";

const viewState = atom({
  key: "viewState",
  defaultValue: VIEW_TYPE.GRID,
});

const viewOptionState = atom({
  key: "viewOptionState",
  defaultValue: VIEW_OPTION_TYPE.ALL,
});

const isDarkMode = atom({
  key: "isDarkMode",
  defaultValue: false,
});

const gridPageState = atom({
  key: "gridPageState",
  defaultValue: 0,
});

const subscribeGridPageState = atom({
  key: "subscribeGridPageState",
  defaultValue: 0,
});

const listPageState = atom({
  key: "listPageState",
  defaultValue: 0,
});

const subscribeListPageState = atom({
  key: "subscribeListPageState",
  defaultValue: 0,
});

const categoryState = atom({
  key: "categoryState",
  defaultValue: "",
});
const selectedSubscribeState = atom({
  key: "selectedSubscribeState",
  defaultValue: "",
});

const subscribeState = atom({
  key: "subscribeState",
  defaultValue: [],
});

const snackBarMsgState = atom({
  key: "snackBarMsgState",
  defaultValue: "",
});

const alertMsgState = atom({
  key: "alertMsgState",
  defaultValue: "",
});

const pageSelector = selector({
  key: "pageSelector",
  get: ({ get }) => {
    const currentView = get(viewState);
    const currentViewOption = get(viewOptionState);

    if (currentView === VIEW_TYPE.LIST) {
      if (currentViewOption === VIEW_OPTION_TYPE.ALL) return get(listPageState);
      return get(subscribeListPageState);
    } else if (currentView === VIEW_TYPE.GRID) {
      if (currentViewOption === VIEW_OPTION_TYPE.ALL) return get(gridPageState);
      return get(subscribeGridPageState);
    }
  },
  set: ({ set, get }, value) => {
    const currentView = get(viewState);
    const currentViewOption = get(viewOptionState);

    if (currentView === VIEW_TYPE.LIST) {
      currentViewOption === VIEW_OPTION_TYPE.ALL
        ? set(listPageState, value)
        : set(subscribeListPageState, value);
    } else if (currentView === VIEW_TYPE.GRID) {
      currentViewOption === VIEW_OPTION_TYPE.ALL
        ? set(gridPageState, value)
        : set(subscribeGridPageState, value);
    }
  },
});

export {
  viewState,
  isDarkMode,
  gridPageState,
  listPageState,
  categoryState,
  subscribeState,
  snackBarMsgState,
  alertMsgState,
  viewOptionState,
  subscribeGridPageState,
  selectedSubscribeState,
  subscribeListPageState,
  pageSelector,
};
