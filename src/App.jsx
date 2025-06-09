import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import UserSetting from "./pages/UserSetting";
import Result from "./pages/Result";
import Recommend from "./pages/Recommend";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HistoryPage from "./pages/HostoryPage";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import useAuthStore from "./store/authStore";

import "./App.css";

function App() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/history" element={<HistoryPage />} />
        <Route path="/user-setting" element={<UserSetting />} />
        <Route path="/result" element={<Result />} />
        <Route path="/recommend" element={<Recommend />} /> */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/user-setting" element={<UserSetting />} />
          <Route path="/result" element={<Result />} />
          <Route path="/recommend" element={<Recommend />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
