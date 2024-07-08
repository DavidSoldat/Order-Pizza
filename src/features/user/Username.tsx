import { useSelector } from 'react-redux';

export interface State {
  user: {
    username: string;
  };
}

export default function Username() {
  const username = useSelector((state: State) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}
