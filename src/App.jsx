import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Result from "./pages/Result";
import Recommend from "./pages/Recommend";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import HealthScore from "./pages/HealthScore";

import "./App.css";
import OnBoarding from "./pages/OnBoarding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        {/* <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedRoute />}>
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
