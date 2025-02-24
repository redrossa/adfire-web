'use client';

import Container from '@/components/Container';
import { ChangeEvent } from 'react';
import { usePortfolio } from '@/components/PortfolioProvider';

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}

const PortfolioLoader = () => {
  const { portfolio, setPortfolio } = usePortfolio();

  const handleChange = async (event: ChangeEvent) => {
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) {
      return;
    }

    const data = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      data.append('files', file);
    }

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      console.error(await res.text());
    }

    const json = await res.json();
    setPortfolio(json);
  };

  return (
      <Container>
        <form className="w-full px-10 py-16 grid grid-cols-5">
          <p className={`col-span-4 ${!portfolio?.config?.name ? 'italic' : 'font-bold'}`}>
            {portfolio?.config?.name || 'No portfolio selected'}
          </p>
          <p className="flex justify-end">
            <label
                htmlFor="portfolio"
                className="underline hover:text-blue-500 hover:cursor-pointer"
            >
              Choose
            </label>
            <input type="file" webkitdirectory="" directory="" name="portfolio" id="portfolio" hidden
                   onChange={handleChange} />
          </p>
        </form>
      </Container>
  );
};

export default PortfolioLoader;