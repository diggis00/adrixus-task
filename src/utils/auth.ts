export const isAuthenticated = () => {
  const TOKEN = localStorage.getItem('user_token');

  return TOKEN ? true : false;
};

export const setToken = (token: string) => {
  localStorage.setItem('user_token', token);
};

export const getToken = () => {
  localStorage.getItem('user_token');
};

export const clearToken = () => {
  localStorage.removeItem('user_token');
};
