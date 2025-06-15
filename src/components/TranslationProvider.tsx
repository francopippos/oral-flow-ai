
import React, { ReactNode } from 'react';

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  return <>{children}</>;
};
