import { customFetch, setDate } from "./utils.js";

const $haederLogo = document.querySelector(".container-header_logo");
const $headerDate = document.querySelector(".container-header_date");

const $newsBar = document.querySelectorAll(".container-news-bar_wrap");
const $leftRollingBox = $newsBar[0];
const $leftRollingList = $leftRollingBox.querySelector("ul");
const $rightRollingBox = $newsBar[1];
const $rightRollingList = $rightRollingBox.querySelector("ul");

export const setHeaderLogo = () => {
  $haederLogo.addEventListener("click", () => window.location.reload());
};

export const setHeaderDate = () => {
  $headerDate.innerText = setDate();
};

export const setHeadline = async () => {
  const headLineData = await customFetch("./mocks/headlines.json");

  fillHeadlineContents(headLineData);

  setRollingInterval();
};

const fillHeadlineContents = (headlineData) => {
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
  const $a = document.createElement("a");

  if (idx === 0) $li.className = "current";
  else if (idx === 1) $li.className = "next";
  else if (idx === 4) $li.className = "prev";

  $a.className = "available-medium14";
  $a.href = link;
  $a.innerHTML = title;

  $li.appendChild($a);

  return $li;
};

export const setRollingInterval = () => {
  let rollingInterval = setInterval(() => {
    rollingCallback();
  }, 5000);

  $leftRollingBox.addEventListener("mouseenter", () => {
    clearInterval(rollingInterval);
  });
  $leftRollingBox.addEventListener("mouseleave", () => {
    rollingInterval = setInterval(() => {
      rollingCallback();
    }, 5000);
  });

  $rightRollingBox.addEventListener("mouseenter", () => {
    clearInterval(rollingInterval);
  });
  $rightRollingBox.addEventListener("mouseleave", () => {
    rollingInterval = setInterval(() => {
      rollingCallback();
    }, 5000);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearInterval(rollingInterval);
      rollingInterval = setInterval(() => {
        rollingCallback();
      }, 5000);
    } else {
      clearInterval(rollingInterval);
    }
  });
};

const rollingCallback = () => {
  rollingElement($leftRollingBox);

  const rightRollingCallback = () => rollingElement($rightRollingBox);
  setTimeout(rightRollingCallback, 1000);
};

const rollingElement = (elem) => {
  elem.querySelector(".prev").classList.remove("prev");

  const $current = elem.querySelector(".current");

  $current.classList.remove("current");
  $current.classList.add("prev");

  const $next = elem.querySelector(".next");

  if ($next.nextElementSibling == null) {
    elem.querySelector("ul li:first-child").classList.add("next");
  } else {
    $next.nextElementSibling.classList.add("next");
  }

  $next.classList.remove("next");
  $next.classList.add("current");
};
