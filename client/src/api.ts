import axios from "axios";

const API = import.meta.env.VITE_API_URL || "";

axios.defaults.withCredentials = true;

// Rewrite absolute localhost URLs to the deployed API
axios.interceptors.request.use((config) => {
  if (
    typeof config.url === "string" &&
    config.url.startsWith("http://localhost:3000")
  ) {
    const path = config.url.replace("http://localhost:3000", "");
    config.url = `${API}${path}`;
  } else if (
    typeof config.url === "string" &&
    API &&
    config.url.startsWith("/")
  ) {
    // also support relative URLs if any
    config.url = `${API}${config.url}`;
  }
  return config;
});
