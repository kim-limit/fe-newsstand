import {
  ROLLING_WAIT_TIME,
  ROLLING_DIFF_TIME,
} from "../../constants/constants.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../utils/my-query-selector.js";

const $newsBar = _querySelectorAll(".container-news-bar_wrap");
const $leftRollingBox = $newsBar[0];
const $leftRollingList = _querySelector("ul", $leftRollingBox);
const $rightRollingBox = $newsBar[1];
const $rightRollingList = _querySelector("ul", $rightRollingBox);

const renderRolling = async (headLineData) => {
  renderItemsToHeadline(headLineData);

  setRollingInterval();
};

const renderItemsToHeadline = (headlineData) => {
  headlineData.slice(0, 5).forEach(({ title, link }, idx) => {
    const headlineContent = createHeadlineContent(title, link, idx);

    $leftRollingList.appendChild(headlineContent);
  });

  headlineData.slice(5, 10).forEach(({ title, link }, idx) => {
    const headlineContent = createHeadlineContent(title, link, idx);

    $rightRollingList.appendChild(headlineContent);
  });
};

const createHeadlineContent = (title, link, idx) => {
  const $li = document.createElement("li");

  if (idx === 0) $li.className = "current";
  else if (idx === 1) $li.className = "next";
  else if (idx === 4) $li.className = "prev";

  const $a = `
    <a class="hover-underline available-medium14" href=${link}> ${title}</a>
  `;

  $li.innerHTML = $a;

  return $li;
};

const setRollingInterval = () => {
  let rollingInterval = setInterval(() => {
    rollingCallback();
  }, ROLLING_WAIT_TIME);

  $leftRollingBox.addEventListener("mouseenter", () => {
    clearInterval(rollingInterval);
  });
  $leftRollingBox.addEventListener("mouseleave", () => {
    rollingInterval = setInterval(() => {
      rollingCallback();
    }, ROLLING_WAIT_TIME);
  });

  $rightRollingBox.addEventListener("mouseenter", () => {
    clearInterval(rollingInterval);
  });
  $rightRollingBox.addEventListener("mouseleave", () => {
    rollingInterval = setInterval(() => {
      rollingCallback();
    }, ROLLING_WAIT_TIME);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearInterval(rollingInterval);
      rollingInterval = setInterval(() => {
        rollingCallback();
      }, ROLLING_WAIT_TIME);
    } else {
      clearInterval(rollingInterval);
    }
  });
};

const rollingCallback = () => {
  rollingElement($leftRollingBox);

  const rightRollingCallback = () => rollingElement($rightRollingBox);
  setTimeout(rightRollingCallback, ROLLING_DIFF_TIME);
};

const rollingElement = (elem) => {
  _querySelector(".prev", elem).classList.remove("prev");

  const $current = _querySelector(".current", elem);

  $current.classList.remove("current");
  $current.classList.add("prev");

  const $next = _querySelector(".next", elem);
  if ($next.nextElementSibling == null) {
    _querySelectorAll("li", elem)[0].classList.add("next");
  } else {
    $next.nextElementSibling.classList.add("next");
  }

  $next.classList.remove("next");
  $next.classList.add("current");
};

export { renderRolling };
