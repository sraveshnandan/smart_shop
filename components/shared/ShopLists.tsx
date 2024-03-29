import { StyleSheet, View } from "react-native";
import React from "react";
import { Ishop } from "@/types";
import ShopCard from "./ShopCard";

const ShopLists = ({ shops }: { shops: Ishop[] }) => {
  return (
    <View>
      {shops.map((s: Ishop, index: number) => (
        <ShopCard key={index} s={s} />
      ))}
    </View>
  );
};

export default ShopLists;

const styles = StyleSheet.create({});
