/**
 * Saves Info into Browser Storage in a JSON string
 * @param key - the key to store the info at
 * @param info - the info to store
 */
export function saveToStorage<T>(key: string, info: T) {
  const valueToSave: string = JSON.stringify(info);
  localStorage.setItem(key, valueToSave);
}

/**
 * Gets the stored info from Browser Storage.
 * @param key - the key that the info was stored at
 * @returns the instance as a T
 */
export function getFromStorage<T>(key: string): T {
  const storedJsonString = localStorage.getItem(key);
  return storedJsonString as T;
}

export function clearKeyFromStorage(key: string) {
  localStorage.removeItem(key);
}
