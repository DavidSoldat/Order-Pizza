import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query.toUpperCase().replace('#', '')}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="duration-30 w-28 rounded-full bg-sky-100 px-4 py-2 text-sm transition-all placeholder:text-stone-400 focus:outline-none focus:ring-sky-600 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}
