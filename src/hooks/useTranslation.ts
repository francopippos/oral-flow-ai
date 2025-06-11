
export const useTranslation = () => {
  const t = (key: string) => key;
  
  return {
    language: 'it',
    setLanguage: () => {},
    t,
  };
};
