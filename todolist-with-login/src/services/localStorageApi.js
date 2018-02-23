const localStorageApi = ({
  add: (user,data) => localStorage.setItem(user, JSON.stringify(data)),
  clear: () => localStorage.clear(),
  get: (user) => JSON.parse(localStorage.getItem(user)),
});
export default localStorageApi;