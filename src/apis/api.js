import axios from "axios";

const request = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.code >= 3000 && err.response.data.code < 4000) {
      alert("오류가 발생하였습니다. 다시 로그인해주세요");
      window.location.href = "/";
    }
  }
);

export default request;
