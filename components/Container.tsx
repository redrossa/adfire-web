interface Props {
  children?: React.ReactNode | Array<React.ReactNode>;
}

const Container = ({ children }: Props) => (
    <div className="w-full border border-solid border-neutral-200 rounded-b-sm flex flex-col items-center shadow-md mb-10">
      {children}
    </div>
);

export default Container;