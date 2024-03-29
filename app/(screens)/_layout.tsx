import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => (
          <Ionicons
            onPress={() => router.back()}
            name="chevron-back"
            size={30}
          />
        ),
      }}
    >
      <Stack.Screen name="ProductsDetails" />
      <Stack.Screen name="BecomeMerchant" />
      <Stack.Screen name="UpgradeAccount" />
      <Stack.Screen name="EditProfile" />
      <Stack.Screen name="EditShop" />
    </Stack>
  );
};
export default StackLayout;
