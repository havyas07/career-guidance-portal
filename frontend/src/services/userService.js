// Reads / clears the locally-stored user. Becomes API-backed later.

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("nextmove_user")) || null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("nextmove_user");
  sessionStorage.clear();
}

// Has the student completed their Career Clarity Report yet?
export function hasReport() {
  const user = getUser();
  return Boolean(user?.report);
}