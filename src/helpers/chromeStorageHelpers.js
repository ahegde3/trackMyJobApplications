const chromeLocalStorage = (() => {
    /*
     *
     * This object returned contains ASYNC wrapper functions to chrome.storage.local
     * These functions also change the localStorage(DOM)
     */
    return {
      getItemAsync: (item) => {
        return item === null
          ? null
          : new Promise((resolve) => {
              chrome.storage.local.get(item.toString(), (res) =>
                resolve(res[item])
              );
            });
      },
  
      setItemAsync: (key, val) => {
        return key === null || val === null
          ? null
          : new Promise((resolve) => {
              chrome.storage.local.set({ [key.toString()]: val }, (res) =>
                resolve(res)
              );
            });
      },
  
      removeItemAsync: (key) => {
        return key === null
          ? null
          : new Promise((resolve) => {
              chrome.storage.local.remove(key.toString(), (res) => resolve(res));
            });
      },
  
      clear: () => {
        return new Promise((resolve) => {
          chrome.storage.local.clear();
        });
      },
    };
  })();
  
  export { chromeLocalStorage };
  