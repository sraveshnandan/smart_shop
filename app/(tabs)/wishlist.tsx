import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWidth } from "@/constants";

const Wishlists = () => {
  return (
    <SafeAreaView
      style={{
        width: ScreenWidth,
        borderWidth: 1,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text>Wishlists</Text>
    </SafeAreaView>
  );
};

export default Wishlists;

const styles = StyleSheet.create({});
