// src/services/api.js
const API_KEY = "01e30928a26fc1f5baeba16656888feb"; // coloque sua chave da API aqui
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}
