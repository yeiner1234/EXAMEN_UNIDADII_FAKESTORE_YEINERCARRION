import { Stack } from "expo-router";

export default function ProductosLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Fake Store" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalle del producto" }} />
    </Stack>
  );
}
