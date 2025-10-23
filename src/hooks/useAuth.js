import { useEffect, useState } from "react";
import request from "../apis/api";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginStatus = () => {
      request
        .get("/main")
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
