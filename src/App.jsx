// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detalhes from "./Detalhes";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Router>
        <header className="p-4 bg-gray-900 shadow-md">
          <h1 className="text-2xl font-bold">🎬 App de Filmes</h1>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
