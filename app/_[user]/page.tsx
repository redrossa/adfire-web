import User from '@/app/_[user]/User';

interface Props {
  params: {
    user: string;
  }
}

export default async function UserPage({ params }: Props) {
  return <User user={params.user} />;
}