import { Navigate, Route, Routes } from "react-router-dom";

import { ChessAnalysis } from "./routes/ChessAnalysis";
import { ChessLocal } from "./routes/ChessLocal";
import { Menu } from "./routes/Menu";

function App() {
  return (
    <Routes>
      <Route index element={<Menu />} />
      <Route path="local" element={<ChessLocal />} />
      <Route path="analysis" element={<ChessAnalysis />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
