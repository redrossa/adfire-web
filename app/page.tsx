import PortfolioLoader from '@/components/PortfolioLoader';
import PortfolioOverview from '@/components/PortfolioOverview';

export default async function Home() {
  return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col m-auto max-w-[96rem] min-w-[64rem]">
          <h2 className="mt-24 font-extrabold">Portfolio Overview</h2>
          <h4 className="mb-10">Find a snapshot about your portfolio here</h4>
          <PortfolioLoader />
          <PortfolioOverview />
        </div>
      </div>
  );
}
