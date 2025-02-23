interface Props {
  value: number;
  isChange: boolean;
}

function colorize(value: number): string {
  if (value > 0) {
    return 'border-green-500 text-green-500';
  } else if (value < 0) {
    return 'border-red-500 text-red-500';
  } else {
    return 'border-neutral-500 text-neutral-500';
  }
}

function displayText(value: number, isChange: boolean): string {
  const abs = Math.abs(value);
  if (!isChange) {
    return abs.toString();
  } else {
    return (value >= 0 ? '+' : '-') + abs;
  }
}

const CategoryTag = ({ value, isChange = true }: Props) => {
  return (
      <div
          className={`row-span-2 p-2 border flex flex-col justify-center ${colorize(isChange ? value : 0)}`}
      >
        <code className="text-center">{displayText(value, isChange)}</code>
      </div>
  );
};

export default CategoryTag;