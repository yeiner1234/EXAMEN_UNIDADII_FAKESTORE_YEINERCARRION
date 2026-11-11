import axios from "axios";

export const productosApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FAKESTORE_API_URL,
  timeout: 15000,
  params: {
    languaje: "es-PE",
  },
});

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "No se pudo conectar con el servidor. Revisa tu conexión a internet.";
    }
    return `El servidor respondió con un error (${error.response.status}).`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Ocurrió un error inesperado.";
};
