export const saveState = state => {
  try {
    // Need to stringify state because localStorage will only allow string values
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
