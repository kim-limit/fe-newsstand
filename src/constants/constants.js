const NEWS_COUNT = 24;
const ROLLING_WAIT_TIME = 5000;
const ROLLING_DIFF_TIME = 1000;
const PROGRESS_DURATION = 20000;
const PROGRESS_MAX_RATE = 100;
const PROGRESS_SCROLL_DURATION = 500;
const PROGRESS_TIME = 1000;
const PROGRESS_MAX = 100;
const PROGRESS_DIFF = 5;
const CATEGORY_LIST = Object.freeze([
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
]);
const CATEGORY_LENGTH = CATEGORY_LIST.length;
const VIEW_TYPE = Object.freeze({
  LIST: "LIST",
  GRID: "GRID",
});
const VIEW_OPTION_TYPE = Object.freeze({
  SUBSCRIBE: "SUBSCRIBE",
  ALL: "ALL",
});
const SNACKBAR_MESSAGE = Object.freeze({
  ADD: "내가 구독한 언론사에 추가되었습니다.",
  DELETE: "내가 구독한 언론사에서 삭제되었습니다.",
  NONE: "현재 구독한 언론사가 없습니다.",
});
const PRESS_ICON = Object.freeze({
  오마이뉴스: {
    light: "./src/assets/images/light/0.png",
    dark: "./src/assets/images/dark/0.png",
  },
  데일리안: {
    light: "./src/assets/images/light/1.png",
    dark: "./src/assets/images/dark/1.png",
  },
  헤럴드경제: {
    light: "./src/assets/images/light/2.png",
    dark: "./src/assets/images/dark/2.png",
  },
  머니투데이: {
    light: "./src/assets/images/light/3.png",
    dark: "./src/assets/images/dark/3.png",
  },
  세계일보: {
    light: "./src/assets/images/light/4.png",
    dark: "./src/assets/images/dark/4.png",
  },
  아시아경제: {
    light: "./src/assets/images/light/5.png",
    dark: "./src/assets/images/dark/5.png",
  },
  이데일리: {
    light: "./src/assets/images/light/6.png",
    dark: "./src/assets/images/dark/6.png",
  },
  조선일보: {
    light: "./src/assets/images/light/7.png",
    dark: "./src/assets/images/dark/7.png",
  },
  아이뉴스24: {
    light: "./src/assets/images/light/8.png",
    dark: "./src/assets/images/dark/8.png",
  },
  파이낸셜뉴스: {
    light: "./src/assets/images/light/9.png",
    dark: "./src/assets/images/dark/9.png",
  },
  스포츠서울: {
    light: "./src/assets/images/light/10.png",
    dark: "./src/assets/images/dark/10.png",
  },
  스포츠동아: {
    light: "./src/assets/images/light/11.png",
    dark: "./src/assets/images/dark/11.png",
  },
  석간문화일보: {
    light: "./src/assets/images/light/12.png",
    dark: "./src/assets/images/dark/12.png",
  },
  "KBS WORLD": {
    light: "./src/assets/images/light/13.png",
    dark: "./src/assets/images/dark/13.png",
  },
  중앙데일리: {
    light: "./src/assets/images/light/14.png",
    dark: "./src/assets/images/dark/14.png",
  },
  인사이트: {
    light: "./src/assets/images/light/15.png",
    dark: "./src/assets/images/dark/15.png",
  },
  법률방송뉴스: {
    light: "./src/assets/images/light/16.png",
    dark: "./src/assets/images/dark/16.png",
  },
  시사저널e: {
    light: "./src/assets/images/light/17.png",
    dark: "./src/assets/images/dark/17.png",
  },
  여성경제신문: {
    light: "./src/assets/images/light/18.png",
    dark: "./src/assets/images/dark/18.png",
  },
  조이뉴스24: {
    light: "./src/assets/images/light/19.png",
    dark: "./src/assets/images/dark/19.png",
  },
  에너지경제: {
    light: "./src/assets/images/light/20.png",
    dark: "./src/assets/images/dark/20.png",
  },
  비즈니스포스트: {
    light: "./src/assets/images/light/21.png",
    dark: "./src/assets/images/dark/21.png",
  },
  스코어데일리: {
    light: "./src/assets/images/light/22.png",
    dark: "./src/assets/images/dark/22.png",
  },
  KNN: {
    light: "./src/assets/images/light/23.png",
    dark: "./src/assets/images/dark/23.png",
  },
  더코리아헤럴드: {
    light: "./src/assets/images/light/24.png",
    dark: "./src/assets/images/dark/24.png",
  },
  MBC: {
    light: "./src/assets/images/light/25.png",
    dark: "./src/assets/images/dark/25.png",
  },
  한국농어촌방송: {
    light: "./src/assets/images/light/26.png",
    dark: "./src/assets/images/dark/26.png",
  },
  뉴데일리: {
    light: "./src/assets/images/light/27.png",
    dark: "./src/assets/images/dark/27.png",
  },
  국민일보: {
    light: "./src/assets/images/light/28.png",
    dark: "./src/assets/images/dark/28.png",
  },
  일간스포츠: {
    light: "./src/assets/images/light/29.png",
    dark: "./src/assets/images/dark/29.png",
  },
  "SBS BIZ": {
    light: "./src/assets/images/light/30.png",
    dark: "./src/assets/images/dark/30.png",
  },
  ZD넷: {
    light: "./src/assets/images/light/31.png",
    dark: "./src/assets/images/dark/31.png",
  },
  마이데일리: {
    light: "./src/assets/images/light/32.png",
    dark: "./src/assets/images/dark/32.png",
  },
  경향신문: {
    light: "./src/assets/images/light/33.png",
    dark: "./src/assets/images/dark/33.png",
  },
  SBS: {
    light: "./src/assets/images/light/34.png",
    dark: "./src/assets/images/dark/34.png",
  },
  서울경제: {
    light: "./src/assets/images/light/35.png",
    dark: "./src/assets/images/dark/35.png",
  },
  매일경제: {
    light: "./src/assets/images/light/36.png",
    dark: "./src/assets/images/dark/36.png",
  },
  MBN: {
    light: "./src/assets/images/light/37.png",
    dark: "./src/assets/images/dark/37.png",
  },
  YTN: {
    light: "./src/assets/images/light/38.png",
    dark: "./src/assets/images/dark/38.png",
  },
  시사위크: {
    light: "./src/assets/images/light/39.png",
    dark: "./src/assets/images/dark/39.png",
  },
  디지털투데이: {
    light: "./src/assets/images/light/40.png",
    dark: "./src/assets/images/dark/40.png",
  },
  데이타뉴스: {
    light: "./src/assets/images/light/41.png",
    dark: "./src/assets/images/dark/41.png",
  },
  한국대학신문: {
    light: "./src/assets/images/light/42.png",
    dark: "./src/assets/images/dark/42.png",
  },
  서울파이낸스: {
    light: "./src/assets/images/light/43.png",
    dark: "./src/assets/images/dark/43.png",
  },
  엑스포츠뉴스: {
    light: "./src/assets/images/light/44.png",
    dark: "./src/assets/images/dark/44.png",
  },
  맥스무비: {
    light: "./src/assets/images/light/45.png",
    dark: "./src/assets/images/dark/45.png",
  },
  OBS: {
    light: "./src/assets/images/light/46.png",
    dark: "./src/assets/images/dark/46.png",
  },
  소년한국일보: {
    light: "./src/assets/images/light/47.png",
    dark: "./src/assets/images/dark/47.png",
  },
  한국일보: {
    light: "./src/assets/images/light/48.png",
    dark: "./src/assets/images/dark/48.png",
  },
  스포탈코리아: {
    light: "./src/assets/images/light/49.png",
    dark: "./src/assets/images/dark/49.png",
  },
  프레시안: {
    light: "./src/assets/images/light/50.png",
    dark: "./src/assets/images/dark/50.png",
  },
  노컷뉴스: {
    light: "./src/assets/images/light/51.png",
    dark: "./src/assets/images/dark/51.png",
  },
  더중앙: {
    light: "./src/assets/images/light/52.png",
    dark: "./src/assets/images/dark/52.png",
  },
  서울신문: {
    light: "./src/assets/images/light/53.png",
    dark: "./src/assets/images/dark/53.png",
  },
  스포츠조선: {
    light: "./src/assets/images/light/54.png",
    dark: "./src/assets/images/dark/54.png",
  },
  전자신문: {
    light: "./src/assets/images/light/55.png",
    dark: "./src/assets/images/dark/55.png",
  },
  한국경제TV: {
    light: "./src/assets/images/light/56.png",
    dark: "./src/assets/images/dark/56.png",
  },
  BLOTER: {
    light: "./src/assets/images/light/57.png",
    dark: "./src/assets/images/dark/57.png",
  },
  KBS: {
    light: "./src/assets/images/light/58.png",
    dark: "./src/assets/images/dark/58.png",
  },
  동아일보: {
    light: "./src/assets/images/light/59.png",
    dark: "./src/assets/images/dark/59.png",
  },
  NEWSIS: {
    light: "./src/assets/images/light/60.png",
    dark: "./src/assets/images/dark/60.png",
  },
  한국경제: {
    light: "./src/assets/images/light/61.png",
    dark: "./src/assets/images/dark/61.png",
  },
  시사IN: {
    light: "./src/assets/images/light/62.png",
    dark: "./src/assets/images/dark/62.png",
  },
  산: {
    light: "./src/assets/images/light/63.png",
    dark: "./src/assets/images/dark/63.png",
  },
  독서신문: {
    light: "./src/assets/images/light/64.png",
    dark: "./src/assets/images/dark/64.png",
  },
  "ECONO TIMES": {
    light: "./src/assets/images/light/65.png",
    dark: "./src/assets/images/dark/65.png",
  },
  TJB: {
    light: "./src/assets/images/light/66.png",
    dark: "./src/assets/images/dark/66.png",
  },
  "시사오늘 시사온": {
    light: "./src/assets/images/light/67.png",
    dark: "./src/assets/images/dark/67.png",
  },
  데일리한국: {
    light: "./src/assets/images/light/68.png",
    dark: "./src/assets/images/dark/68.png",
  },
  뉴스토마토: {
    light: "./src/assets/images/light/69.png",
    dark: "./src/assets/images/dark/69.png",
  },
  에이블뉴스: {
    light: "./src/assets/images/light/70.png",
    dark: "./src/assets/images/dark/70.png",
  },
  "YTN 사이언스": {
    light: "./src/assets/images/light/71.png",
    dark: "./src/assets/images/dark/71.png",
  },
  OSEN: {
    light: "./src/assets/images/light/72.png",
    dark: "./src/assets/images/dark/72.png",
  },
  디지털타임스: {
    light: "./src/assets/images/light/73.png",
    dark: "./src/assets/images/dark/73.png",
  },
  미디어오늘: {
    light: "./src/assets/images/light/74.png",
    dark: "./src/assets/images/dark/74.png",
  },
  연합뉴스: {
    light: "./src/assets/images/light/75.png",
    dark: "./src/assets/images/dark/75.png",
  },
  한겨레: {
    light: "./src/assets/images/light/76.png",
    dark: "./src/assets/images/dark/76.png",
  },
  "조선 BIZ": {
    light: "./src/assets/images/light/77.png",
    dark: "./src/assets/images/dark/77.png",
  },
  JTBC: {
    light: "./src/assets/images/light/78.png",
    dark: "./src/assets/images/dark/78.png",
  },
  METRO: {
    light: "./src/assets/images/light/79.png",
    dark: "./src/assets/images/dark/79.png",
  },
  비즈한국: {
    light: "./src/assets/images/light/80.png",
    dark: "./src/assets/images/dark/80.png",
  },
  주간경향: {
    light: "./src/assets/images/light/81.png",
    dark: "./src/assets/images/dark/81.png",
  },
  FORBES: {
    light: "./src/assets/images/light/82.png",
    dark: "./src/assets/images/dark/82.png",
  },
  "TV REPORT": {
    light: "./src/assets/images/light/83.png",
    dark: "./src/assets/images/dark/83.png",
  },
  티브이데일리: {
    light: "./src/assets/images/light/84.png",
    dark: "./src/assets/images/dark/84.png",
  },
  BBS: {
    light: "./src/assets/images/light/85.png",
    dark: "./src/assets/images/dark/85.png",
  },
  MONDE: {
    light: "./src/assets/images/light/86.png",
    dark: "./src/assets/images/dark/86.png",
  },
  MK스포츠: {
    light: "./src/assets/images/light/87.png",
    dark: "./src/assets/images/dark/87.png",
  },
  텐아시아: {
    light: "./src/assets/images/light/88.png",
    dark: "./src/assets/images/dark/88.png",
  },
  정책브리핑: {
    light: "./src/assets/images/light/89.png",
    dark: "./src/assets/images/dark/89.png",
  },
  씨네21: {
    light: "./src/assets/images/light/90.png",
    dark: "./src/assets/images/dark/90.png",
  },
  뉴스타파: {
    light: "./src/assets/images/light/91.png",
    dark: "./src/assets/images/dark/91.png",
  },
  뉴스포스트: {
    light: "./src/assets/images/light/92.png",
    dark: "./src/assets/images/dark/92.png",
  },
  정신의학신문: {
    light: "./src/assets/images/light/93.png",
    dark: "./src/assets/images/dark/93.png",
  },
  철강금속신문: {
    light: "./src/assets/images/light/94.png",
    dark: "./src/assets/images/dark/94.png",
  },
  IT조선: {
    light: "./src/assets/images/light/95.png",
    dark: "./src/assets/images/dark/95.png",
  },
});

export {
  NEWS_COUNT,
  ROLLING_WAIT_TIME,
  ROLLING_DIFF_TIME,
  PROGRESS_TIME,
  CATEGORY_LIST,
  PRESS_ICON,
  PROGRESS_DIFF,
  PROGRESS_MAX,
  CATEGORY_LENGTH,
  VIEW_TYPE,
  VIEW_OPTION_TYPE,
  SNACKBAR_MESSAGE,
  PROGRESS_DURATION,
  PROGRESS_MAX_RATE,
  PROGRESS_SCROLL_DURATION,
};
