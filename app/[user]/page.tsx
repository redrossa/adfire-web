import User from '@/app/User';

interface Props {
  params: {
    user: string;
  }
}

export default async function UserPage({ params }: Props) {
  return <User user={params.user} />;
}