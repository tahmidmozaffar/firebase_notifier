type ReturnType = {
  setLocalItem: (key: string, value: string) => void,
  getLocalItem: (key: string, defaultValue?: string) => string,
  clearLocalItems: () => void,
};

export const useLocalStorage = (): ReturnType => {

  const setLocalItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getLocalItem = (key: string, defaultValue: string = ''): string => {
    return localStorage.getItem(key) ?? defaultValue;
  };

  const clearLocalItems = () => {
    localStorage.clear();
  };

  return { setLocalItem, getLocalItem, clearLocalItems };
};
