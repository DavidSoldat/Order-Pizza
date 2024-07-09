import { useSelector } from 'react-redux';
import { UserState } from '../../utils/types';

export default function Username() {
  const username = useSelector((state: UserState) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}
