import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({
  children,
  to,
}: {
  children: string;
  to: string;
}) {
  const navigate = useNavigate();
  const className = "text-sm text-sky-400 hover:text-sky-600 hover:underline";

  if (to === "-1") {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
