import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Result from "./pages/Result";
import Recommend from "./pages/Recommend";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recommend />} />
      </Routes>
    </Router>
  );
}

export default App;
