
// Hook rimosso - utilizziamo solo italiano
export const useTranslation = () => {
  return {
    t: (key: string) => key,
    language: 'it',
    setLanguage: () => {}
  };
};
