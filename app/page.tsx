import Container from '@/components/Container';
import overview from '../.reports/index.json';

export default function Home() {
  return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col m-auto max-w-[96rem] min-w-[56rem]">
          <h2 className="mt-24 font-extrabold">Portfolio Overview</h2>
          <h4 className="mb-10">Find a snapshot about your portfolio here</h4>
          <Container>
            <div className="w-full px-10 py-16">
              <h4 className="font-extrabold">Highlighted Transactions</h4>
            </div>
            {overview.map((item, i) => (
                <div
                    className="w-full p-10 grid grid-cols-5 grid-rows-2 border-t border-solid border-neutral-200"
                    key={i}
                >
                  <h6 className="place-content-end font-light">{item.date}</h6>
                  <h5 className="place-content-end col-span-3 align-middle">{item.account_name}</h5>
                  <div
                      className={`row-span-2 p-2 border flex items-center justify-center ${item.amount >= 0 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                  >
                    <code className="text-center">{Math.abs(item.amount)} {item.symbol}</code>
                  </div>
                  <div className="col-start-2 flex items-center">
                    <small className="col-start-2 bg-neutral-100 text-neutral-600 py-0.5 px-2 rounded-full">{item.category}</small>
                  </div>
                </div>
            ))}
          </Container>
        </div>
      </div>
  );
}
