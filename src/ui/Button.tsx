import { Link } from 'react-router-dom';
import { Styles } from '../utils/types';

export default function Button({
  children,
  disabled,
  to,
  type,
  onClick,
}: {
  children: string | string[];
  disabled?: boolean;
  to?: string;
  type: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const base =
    'bg-sky-400 uppercase text-sm tracking-wide rounded-full font-semibold text-stone-800  inline-block hover:bg-sky-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-sky-400 focus:bg-sky-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles: Styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    secondary:
      'px-4 py-2 text-sm md:px-6 md:py-3.5 uppercase border-2 border-stone-300 tracking-wide rounded-full font-semibold text-stone-400  inline-block hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick) {
    return (
      <button className={styles[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
