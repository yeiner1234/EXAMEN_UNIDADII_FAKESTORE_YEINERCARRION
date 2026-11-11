import { Producto } from "@/infrastructure/interfaces/producto.interface";
import { mapProducto } from "@/infrastructure/mappers/producto.mapper";
import { FakeStoreProductResponse } from "@/infrastructure/responses/producto.response";
import { productosApi } from "@/services/actions/productos.api";

export const getProductoById = async (id: number): Promise<Producto> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("El identificador del producto no es válido.");
  }
  const { data } = await productosApi.get<FakeStoreProductResponse | "">(`/products/${id}`);
  if (!data) {
    throw new Error("Producto no encontrado");
  }
  return mapProducto(data);
};
