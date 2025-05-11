import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Result from "./pages/Result";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSetting />} />
      </Routes>
    </Router>
  );
}

export default App;
