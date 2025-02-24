'use client';

import { createContext, useContext, useState } from 'react';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

interface PortfolioContextProps {
  portfolio: any;
  setPortfolio: (o: any) => void;
}

const PortfolioContext = createContext<PortfolioContextProps>({
  portfolio: null,
  setPortfolio: () => {}
});

export function PortfolioProvider({ children }: Props) {
  const [portfolio, setPortfolio] = useState(null);

  return (
      <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
        {children}
      </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
}