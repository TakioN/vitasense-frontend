import { useEffect, useState } from "react";
import axios from "axios";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginStatus = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/main`, {
          withCredentials: true,
        })
        .then((res) => {
          setIsLoggedIn(true);
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    loginStatus();
  }, []);

  return { isLoading, isLoggedIn };
}

export default useAuth;
