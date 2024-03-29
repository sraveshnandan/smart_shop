import { Stack } from "expo-router";
const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
};
export default StackLayout;
