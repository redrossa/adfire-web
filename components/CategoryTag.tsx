interface Props {
  category: string;
}

function capitalizeWords(s: string): string {
  if (s == 'rsu') {
    return 'RSU';
  }
  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function displayText(category: string): string {
  const [, ...rest] = category.split('.');
  const joined = rest.join(' ').replace('_', ' ');
  return capitalizeWords(joined);
}

function colorizeCategory(category: string): string {
  const [major] = category.split('.');
  switch (major) {
    case 'income':
      return 'bg-green-100 text-green-600';
    case 'expenses':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-neutral-100 text-neutral-100';
  }
}

const CategoryTag = ({ category }: Props) => {
  return (
      <small className={`col-start-2 py-0.5 px-2 rounded-full ${colorizeCategory(category)}`}>
        {displayText(category)}
      </small>
  );
};

export default CategoryTag;