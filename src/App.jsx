import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Result from "./pages/Result";
import Recommend from "./pages/Recommend";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import HistoryPage from "./pages/HostoryPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/history" element={<HistoryPage />} />
        <Route path="/user-setting" element={<UserSetting />} />
        <Route path="/result" element={<Result />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </Router>
  );
}

export default App;
