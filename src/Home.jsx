import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const API_KEY = "01e30928a26fc1f5baeba16656888feb";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 🔍 Buscar filmes
  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
      );
      const data = await res.json();

      if (data.results.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  // Carregar primeira página
  useEffect(() => {
    fetchMovies();
  }, []);

  // 📜 Detectar rolagem
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        fetchMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMovies]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filmes Populares</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link to={`/detalhes/${movie.id}`} key={movie.id}>
            <div className="bg-gray-800 rounded shadow hover:scale-105 transition p-2">
              {movie.poster_path ? (
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded mb-2"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  Sem imagem
                </div>
              )}
              <h2 className="text-sm font-semibold">{movie.title}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-center mt-4">Carregando...</p>}
      {!hasMore && <p className="text-center mt-4">Não há mais filmes</p>}
    </div>
  );
}

export default Home;
