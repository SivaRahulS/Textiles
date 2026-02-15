import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//  HARDCODE TOKEN FOR DEBUGGING
API.interceptors.request.use((req) => {
  req.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxNDcxYTNjLWU3MzQtNDg2YS1iZWVmLWY0ODY5NjkxZmEyMyIsImlhdCI6MTc3MTE2NzkzOSwiZXhwIjoxNzcxNzcyNzM5fQ.PogNFoa6rxxt465jm_oBNRXqQUK2hONgmF_zSkAo7Hc";

  return req;
});

export default API;
