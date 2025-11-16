import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Result from "./pages/Result";
import Recommend from "./pages/Recommend";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import HealthScore from "./pages/HealthScore";

import "./App.css";
import OnBoarding from "./pages/OnBoarding";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my" element={<MyPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/user-setting" element={<UserSetting />} />
          <Route path="/result" element={<Result />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/health-score" element={<HealthScore />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
