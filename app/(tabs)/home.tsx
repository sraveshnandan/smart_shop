import { ScrollView, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@/constants";
import {
  CategorySection,
  Header,
  ImageSlider,
  Loader,
  ShopListsSection,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShops } from "@/utils/actions";
import { IUser, Ishop } from "@/types";
import { setUserShop } from "@/redux/reducers/user.reducer";
import { RootState } from "@/redux/store";
import { router } from "expo-router";

const Home = () => {
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.user.details);
  const [shops, setshops] = useState<Ishop[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const fetchAllShopsDAta = async () => {
    setloading(true);
    const res = await fetchAllShops(() => {});
    if (res.shops || res.category) {
      setshops(res.shops);
      setloading(false);
    } else {
      router.push(`/(auth)/`);
    }
  };
  useLayoutEffect(() => {
    fetchAllShopsDAta();
    return () => {};
  }, []);
  return !loading ? (
    <SafeAreaView style={styles.container}>
      {/* Header Section  */}
      <Header />
      {/* Scrollable Section  */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingTop: 5 }}
        style={styles.scrollSection}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Slider  */}
        <ImageSlider />
        {/* Category Section  */}
        <CategorySection />
        {/* Shop list  */}
        {shops.length > 0 && <ShopListsSection shops={shops} />}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loader />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ScreenWidth,
    paddingHorizontal: 5,
  },
  scrollSection: {
    width: ScreenWidth * 0.98,
  },
});
