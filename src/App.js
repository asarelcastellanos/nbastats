import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PlayerInfo from "./pages/PlayerInfo";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/playerinfo/:id' element={<PlayerInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
