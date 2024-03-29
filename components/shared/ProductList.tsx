import { StyleSheet, View } from "react-native";
import React from "react";
import { IProduct } from "@/types";
import { ScreenWidth } from "@/constants";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <View style={styles.container}>
      {products &&
        products.map((p: IProduct, index: number) => <ProductCard p={p} />)}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
