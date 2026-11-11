import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

import { Producto } from "@/infrastructure/interfaces/producto.interface";
import { getProductos } from "@/services/actions/productos.action";
import { getErrorMessage } from "@/services/actions/productos.api";

export default function ProductosScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch((e: unknown) => setError(getErrorMessage(e)))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <ActivityIndicator className="flex-1" size="large" />;
  }

  if (error) {
    return <Text className="p-4 text-red-600">{error}</Text>;
  }

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          className="flex-row items-center border-b border-gray-200 p-3"
          onPress={() => router.push({ pathname: "/productos/[id]", params: { id: item.id } })}
        >
          <Image source={{ uri: item.imagenUrl }} style={{ width: 60, height: 60 }} contentFit="contain" />
          <View className="ml-3 flex-1">
            <Text>{item.nombre}</Text>
            <Text className="font-bold">${item.precio}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
