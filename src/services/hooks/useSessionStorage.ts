type ReturnType = {
  setSessionItem: (key: string, value: string) => void,
  getSessionItem: (key: string, defaultValue?: string) => string,
  clearSession: () => void,
};

export const useSessionStorage = (): ReturnType => {

  const setSessionItem = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  };

  const getSessionItem = (key: string, defaultValue: string = ''): string => {
    return sessionStorage.getItem(key) ?? defaultValue;
  };

  const clearSession = () => {
    sessionStorage.clear();
  };

  return { setSessionItem, getSessionItem, clearSession };
};
