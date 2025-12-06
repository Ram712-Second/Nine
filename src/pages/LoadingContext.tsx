import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface LoadingContextType {
  isInitialLoad: boolean;
  finishInitialLoad: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const finishInitialLoad = () => {
    setIsInitialLoad(false);
  };

  const value = useMemo(() => ({ isInitialLoad, finishInitialLoad }), [isInitialLoad]);

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};