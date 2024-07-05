import { Link } from "react-router-dom";

export default function Button({
  children,
  disabled,
  to,
}: {
  children: string;
  disabled?: boolean;
  to?: string;
}) {
  const className =
    "bg-sky-400 uppercase tracking-wide rounded-full font-semibold text-stone-800 px-4 py-3 inline-block hover:bg-sky-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-sky-400 focus:bg-sky-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";
  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
