export const TOKEN_KEY = "@token";
export const NAME = "@name";

export const isAuthenticated = () => true;//localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getName = () => localStorage.getItem(NAME);

export const setInfosLocalStorage = (token, name) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NAME, name);
};
export const setTokenLocalStorage = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logoutAdm = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME);
};