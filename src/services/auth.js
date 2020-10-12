import history from './history';
export const TOKEN_KEY = "@token";
export const INFOS = "@infos";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getInfos = () => localStorage.getItem(INFOS);

export const setInfosLocalStorage = (token, infos) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(INFOS, JSON.stringify(infos));
};
export const setTokenLocalStorage = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(INFOS);
  history.push('/login');
};