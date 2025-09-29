// Utility to check for token
export const TOKEN_KEY = 'auth_token';

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function signOut() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = '/';
}
