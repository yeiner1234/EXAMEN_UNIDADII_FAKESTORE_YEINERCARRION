import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";

import { Producto } from "@/infrastructure/interfaces/producto.interface";
import { getProductoById } from "@/services/actions/producto_detail.action";
import { getErrorMessage } from "@/services/actions/productos.api";

export default function ProductoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductoById(Number(id))
      .then(setProducto)
      .catch((e: unknown) => setError(getErrorMessage(e)))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return <ActivityIndicator className="flex-1" size="large" />;
  }

  return (
    <ScrollView contentContainerClassName="p-4">
      {error || !producto ? (
        <Text className="text-red-600">
          {error ?? "Producto no encontrado."}
        </Text>
      ) : (
        <>
          <Image
            source={{ uri: producto.imagenUrl }}
            style={{ height: 250 }}
            contentFit="contain"
          />
          <Text className="mt-4 text-lg font-bold">{producto.nombre}</Text>
          <Text className="mt-2">${producto.precio}</Text>
          <Text className="mt-2">Categoría: {producto.categoria}</Text>
          <Text className="mt-2">descripcion: {producto.descripcion}</Text>
        </>
      )}
    </ScrollView>
  );
}
