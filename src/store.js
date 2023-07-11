export const pagesStore = (function () {
  let instance;
  let pages = 0;
  function init() {
    return {
      getPages: () => {
        return pages;
      },
      setPages: (offset) => {
        pages += offset;
        return pages;
      },
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();