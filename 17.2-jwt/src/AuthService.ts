

import axios from "axios";

let accessToken = "";

// setInterval(() => {
//   console.log(accessToken);
// }, 1000);

export function login(email: string, password: string) {
  // fetch("...", {credentials: "include"})
  return axios
    .post("https://kodbazis.hu/api/login-user", { email, password }, { withCredentials: true })
    .then((res) => {
      accessToken = res.data.accessToken;
    });
}

export function logout() {
  return axios.post("https://kodbazis.hu/api/logout-user", {}, { withCredentials: true })
    .then((res) => {
      accessToken = "";
    });
}

export const fetchHitelesitessel = axios.create();

// Kimenő kérést módosító interceptor
fetchHitelesitessel.interceptors.request.use(
  (config) => {
    if (!accessToken) {
      return config;
    }

    console.log(config);
    

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    };
  },
  (error) => Promise.reject(error)
);

// Választ módosító interceptor
fetchHitelesitessel.interceptors.response.use(
  (response) => response,
  (error) => {
    // Valami hiba van
    if (error.response.status !== 403) {
      // Nem authentikációs jellegű hiba van
      return Promise.reject(error);
    }

    // Lemásoljuk a request adatokat
    const originalRequest = error.config;

    if (originalRequest.isRetry) {
      // Már egyszer meg lett kísérelve a token megújítása 
      return Promise.reject(error);
    }

    // Megjelöljük a configban, hogy kísérlet történik a megújításra
    originalRequest.isRetry = true;

    // Kimegy az access tokent megújító kérés
    return axios
      .get("https://kodbazis.hu/api/get-new-access-token", {
        withCredentials: true,
      })
      .then((res) => {
        // Sikerült megújítani a tokent -> eltároljuk a memóriába
        accessToken = res.data.accessToken;
      })
      .then(() => fetchHitelesitessel(originalRequest));
  }
);

