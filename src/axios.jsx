import axios from "axios"

const header = localStorage.getItem("accessToken")
  ? {
    token: "Bearer " + localStorage.getItem("accessToken"),
  }
  : {
    token: "Bearer ",
  };

console.log(header, "okkkkkkkkkkk");

const Axios = axios.create({
  baseURL :  "http://localhost:5000/api",
  headers: header,
  withCredentials: false,
});
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default Axios;