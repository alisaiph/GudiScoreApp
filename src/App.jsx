import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./Menu";
import Start from "./Start";
import Gameplay from "./Gameplay";
import { PlayersProvider } from "./PlayersContext";

function App() {
  return (
    <main className="bg-slate-100 h-svh flex items-center justify-center">
      <PlayersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/start" element={<Start />} />
            <Route path="/start/game" element={<Gameplay />} />
          </Routes>
        </BrowserRouter>
      </PlayersProvider>
    </main>
  );
}

export default App;
