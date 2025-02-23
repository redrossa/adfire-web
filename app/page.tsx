import Container from '@/components/Container';
import overview from '../.reports/index.json';
import CategoryTag from '@/components/CategoryTag';
import AmountTag from '@/components/AmountTag';

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
        </div>
      </div>
  );
}
