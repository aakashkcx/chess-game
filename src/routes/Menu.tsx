import { Link } from "react-router-dom";

import "./Menu.css";

export function Menu() {
  return (
    <div className="menu">
      <h1>Chess Game</h1>
      <nav>
        <Link to="/ai">Play vs AI</Link>
        <Link to="/local">Play vs Local</Link>
        <Link to="/online">Play vs Online</Link>
        <Link to="/analysis">Analysis Board</Link>
      </nav>
      <small>
        Created by <a href="https://github.com/aakashkcx">Aakash Kc</a>
        <br />
        <a href="https://github.com/aakashkcx/chess-game">Source Code</a>
        <br />
        <a href="https://github.com/aakashkcx/chess-engine">Powered By</a>
      </small>
    </div>
  );
}
