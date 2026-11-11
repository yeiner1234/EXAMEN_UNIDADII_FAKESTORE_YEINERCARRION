import { Producto } from "@/infrastructure/interfaces/producto.interface";
import { mapProductos } from "@/infrastructure/mappers/producto.mapper";
import { FakeStoreProductResponse } from "@/infrastructure/responses/producto.response";
import { productosApi } from "@/services/actions/productos.api";

export const getProductos = async (): Promise<Producto[]> => {
  const { data } = await productosApi.get<FakeStoreProductResponse[]>("/products");
  return mapProductos(data);
};
