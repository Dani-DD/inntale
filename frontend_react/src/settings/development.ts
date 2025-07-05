const ENVIRONMENT = "production";

export const ORIGIN =
    ENVIRONMENT == "production"
        ? "https://backendinntale.up.railway.app/"
        : "127.0.0.1:8000/";
