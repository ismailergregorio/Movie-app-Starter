import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "01e30928a26fc1f5baeba16656888feb"; //  chave da API 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Detalhes() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
      const data = await res.json();
      setMovie(data);
    }

    async function fetchTrailer() {
      const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
      const data = await res.json();
      const officialTrailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(officialTrailer);
    }

    async function fetchCast() {
      const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
      const data = await res.json();
      setCast(data.cast.slice(0, 5)); // só mostra os 5 primeiros atores
    }

    fetchMovie();
    fetchTrailer();
    fetchCast();
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <Link to="/" className="px-3 py-1 bg-gray-700 rounded mb-4 inline-block">
        ← Voltar
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {movie.poster_path && (
          <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} className="w-100 rounded" />
        )}

        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">Lançamento: {movie.release_date}</p>

          {/* Nota corrigida */}
          {movie.vote_average > 0 ? (
            <p className="my-2 bg-blue-600 inline-block px-2 py-1 rounded">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          ) : (
            <p className="text-gray-400">Sem nota disponível</p>
          )}

          <p className="mt-4">{movie.overview || "Sem descrição disponível."}</p>

          {/* 🎬 Trailer */}
          {trailer && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Trailer Oficial</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          )}

          {/* 🎭 Elenco */}
          {cast.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Elenco Principal</h2>
              <ul className="list-disc ml-5">
                {cast.map((actor) => (
                  <li key={actor.cast_id}>
                    {actor.name} como <span className="text-gray-400">{actor.character}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
