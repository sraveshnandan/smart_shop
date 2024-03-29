import { setAllProductsData } from "@/redux/reducers/product.reducers";
import { setAllShops } from "@/redux/reducers/user.reducer";
import { RootState, store } from "@/redux/store";
import { IProduct, Ishop } from "@/types";
import { fetchAllProducts, fetchAllShops } from "@/utils/actions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const dispatch = useDispatch();
  const details: any = useSelector((state: RootState) => state.user.details);
  useEffect(() => {
    fetchAllShops(() => {}).then((res: any) => {
      if (res.shops || res.category) {
        dispatch(setAllShops(res.shops));
        console.log("All Shops", res.shops);
        console.log("All Category", res.category);

        let userShop = res.shops.filter(
          (s: Ishop) => s.owner?._id === details.user?._id
        );
        console.log("User Shop", userShop);
      }
    });
    fetchAllProducts((products) => {
      console.log("All Products", products);
      dispatch(setAllProductsData(products));
      let data = products.filter(
        (p: IProduct) => p.owner?.owner?._id === details.user._id
      );
      console.log("user products", data);
    });
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false, headerBlurEffect: "light" }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screens)" />
      <Stack.Screen name="(auth)" options={{ headerLargeTitle: true }} />
    </Stack>
  );
}
