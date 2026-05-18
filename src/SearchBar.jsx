// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar filmes..."
        className="border rounded px-2 py-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 rounded">
        Buscar
      </button>
    </form>
  );
}
