interface Props {
  children?: React.ReactNode | Array<React.ReactNode>;
  className?: string;
  float?: boolean;
}

const Container = ({ children, className, float }: Props) => (
    <div
        className={`
            w-full border border-solid border-neutral-200 rounded-b-sm 
            ${float ? 'shadow-md' : ''}
            ${className}
        `}
    >
      {children}
    </div>
);

export default Container;