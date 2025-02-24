'use client';

import AmountTag from '@/components/AmountTag';
import CategoryTag from '@/components/CategoryTag';
import Container from '@/components/Container';
import { usePortfolio } from '@/components/PortfolioProvider';

interface Transactions {
  date: string;
  title: string;
  amount: number;
  account: string;
  category: string;
  type: string;
}

const PortfolioOverview = () => {
  const { portfolio } = usePortfolio();
  return !portfolio?.index ? null : (
      <Container>
        <div className="w-full px-10 py-16">
          <h4 className="font-extrabold">Highlighted Transactions</h4>
        </div>
        {portfolio.index.map((item: Transactions, i: number) => (
            <div
                className="w-full p-10 grid grid-cols-5 grid-rows-2 gap-x-16 border-t border-solid border-neutral-200"
                key={i}
            >
              <h6 className="place-content-end font-light">{item.date}</h6>
              <h5 className="place-content-end col-span-3 align-middle">{item.title}</h5>
              <AmountTag value={item.amount} isChange={item.type !== 'open'} />
              <div className="col-start-2 col-span-3 flex items-center gap-4">
                <small>{item.account}</small>
                {item.category && <CategoryTag category={item.category} />}
              </div>
            </div>
        ))}
      </Container>
  );
};

export default PortfolioOverview;