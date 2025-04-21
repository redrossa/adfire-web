import Navbar from '@/app/Navbar';

const SignedIn = async () => {
  return (
      <div>
        <Navbar />
        <main className="flex flex-col m-auto max-w-[96rem] min-w-[64rem]">
          <p>Hello world!</p>
        </main>
      </div>
  );
};

export default SignedIn;