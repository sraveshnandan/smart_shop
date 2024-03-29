import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@/constants";
import { IProduct } from "@/types";
import { ProductCard } from "@/components";

const ProductsDetails = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const AllProducts = useSelector((state: RootState) => state.product.Products);
  const [products, setproducts] = useState<IProduct[] | undefined>([
    ...new Set(AllProducts.filter((p) => p.owner?._id === params.shopId)),
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${AllProducts[0].owner.name} Products`,
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        width: ScreenWidth,
        flex: 1,
        paddingHorizontal: 10,
        alignItems: "center",
      }}
    >
      {/* Products ScrollView  */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
            marginBottom: 15,
            alignSelf: "flex-start",
            paddingLeft: 15,

          }}
        >
          All products
        </Text>
        {products!.map((p: IProduct, index: number) => (
          <ProductCard p={p} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsDetails;

const styles = StyleSheet.create({});
