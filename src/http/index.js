import axios from "axios";
import store from "../store";
import router from "../router";

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  transformRequest: (data, headers) => {
    headers["Authorization"] = `Basic ${store.state.accessToken}`;
    headers["Content-Type"] = "application/json";
    return JSON.stringify(data);
  }
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    store.commit("signOut");
    router.push("/auth");
    return Promise.reject(error);
  }
);

export default instance;
