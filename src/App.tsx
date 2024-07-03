import { Route, Routes } from "react-router-dom";

import { ChessAI } from "./routes/ChessAI";
import { ChessAnalysis } from "./routes/ChessAnalysis";
import { ChessLocal } from "./routes/ChessLocal";
import { Home } from "./routes/Home";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<ChessAI />} />
      <Route path="/local" element={<ChessLocal />} />
      <Route path="/analysis" element={<ChessAnalysis />} />
    </Routes>
  );
}

export default App;
