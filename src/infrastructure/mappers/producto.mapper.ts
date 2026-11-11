import { Producto } from "@/infrastructure/interfaces/producto.interface";
import { FakeStoreProductResponse } from "@/infrastructure/responses/producto.response";

export const mapProducto = (response: FakeStoreProductResponse): Producto => ({
  id: response.id,
  nombre: response.title.trim(),
  imagenUrl: response.image.replace(/^http:\/\//, "https://"),
  precio: response.price,
  categoria: response.category,
  descripcion: response.description,
});

export const mapProductos = (responses: FakeStoreProductResponse[]): Producto[] =>
  responses.map(mapProducto);
