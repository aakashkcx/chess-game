import { Navigate, Route, Routes } from "react-router-dom";

import { ChessAI } from "./routes/ChessAI";
import { ChessAnalysis } from "./routes/ChessAnalysis";
import { ChessLocal } from "./routes/ChessLocal";
import { Menu } from "./routes/Menu";

function App() {
  return (
    <Routes>
      <Route index element={<Menu />} />
      <Route path="ai" element={<ChessAI />} />
      <Route path="local" element={<ChessLocal />} />
      <Route path="analysis" element={<ChessAnalysis />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
