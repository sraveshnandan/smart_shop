import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors, ScreenWidth } from "@/constants";
import { getPercentage } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { IProduct } from "@/types";
import { router } from "expo-router";

const ProductCard = ({ p }: { p: IProduct }) => {
  const [liked, setliked] = useState<boolean>(false);
  return (
    <View style={styles.productCard}>
      {/* Product Image  */}
      <View
        style={{
          width: "100%",
          height: 250,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.White,
          borderRadius: 6,
        }}
      >
        {p.images.length ? (
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            source={{ uri: p.images[0].url }}
          />
        ) : (
          <Ionicons name="paper-plane-outline" color={"#444"} size={155} />
        )}
      </View>
      {/* Like button  */}
      <View style={{ position: "absolute", right: 10, top: 10 }}>
        <TouchableOpacity onPress={() => setliked((prev) => !prev)}>
          {liked ? (
            <Ionicons name="heart" size={30} color={Colors.Red} />
          ) : (
            <Ionicons name="heart-outline" size={30} color={Colors.Red} />
          )}
        </TouchableOpacity>
      </View>
      {/* Products Details  */}
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
        onPress={() =>
          router.push(`/(screens)/Productpage?id=${p._id}` as any)
        }
      >
        <Text style={{ fontSize: 28, fontWeight: "600" }}>
          {p.title?.substring(0, 13)}...
        </Text>

        <Text style={{ color: Colors.Secondry, fontSize: 18 }}>
          {p.ratings}
          <Text style={{ fontSize: 26 }}>★</Text>
        </Text>
      </TouchableOpacity>

      {/* Price Section  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
          justifyContent: "flex-start",
          width: "100%",
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 28, color: Colors.Secondry }}>
          ₹{p.discount_price}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: Colors.Red,
            textDecorationLine: "line-through",
          }}
        >
          ₹{p.original_price}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: Colors.Secondry,
            marginLeft: 10,
          }}
        >
          {getPercentage(Number(p.original_price), Number(p.discount_price))}%
          OFF
        </Text>
      </View>

      {/* Short Description  */}
      <Text
        style={{
          borderTopWidth: 1,
          borderColor: Colors.Grey,
          marginTop: 5,
        }}
      >
        {p.description?.substring(0, 80)}...
      </Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    width: ScreenWidth * 0.9,
    padding: 5,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#888",
    borderRadius: 6,
    marginBottom: 22,
  },
  pImg: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    backgroundColor: Colors.Grey,
    padding: 5,
    borderRadius: 6,
  },
});
