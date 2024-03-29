import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Categories, Colors, ScreenWidth } from "@/constants";
import Slider from "./Slider";
import { Ionicons } from "@expo/vector-icons";
import { Ishop } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ShopCard = ({ s }: { s: Ishop }) => {
  const details: any = useSelector((state: RootState) => state.user.details);

  const [owner, setOwner] = useState<boolean>(false);
  const [followed, setfollowed] = useState(false);
  let images: string[] = [];
  useEffect(() => {
    Categories.forEach((i) => images.push(i.icon as any));
    if (s.owner?._id === details.user._id) {
      setOwner(true);
    }
  }, []);
  return (
    <View style={styles.shopCardBox}>
      {/* Card Header  */}
      <View style={styles.cardHeader}>
        {/* Card Owner Img  */}
        <View style={styles.IMGBox}>
          <Image
            style={styles.ownerIMG}
            source={
              s.owner?.avatar.url !== "sample id"
                ? { uri: s.owner?.avatar.url }
                : require("../../assets/images/logo.png")
            }
          />
          <Text style={styles.shopheader}>{s.name?.substring(0, 25)}</Text>
        </View>

        {!owner ? (
          <TouchableOpacity
            style={[styles.btn, followed ? { backgroundColor: "#444" } : null]}
            onPress={() => {
              console.log(setfollowed((prev) => !prev));
            }}
          >
            <Text style={styles.btnText}>
              {followed ? "Un follow" : "follow"}
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                console.log("Edit button is clicked.");
              }}
            >
              <Ionicons name="ellipsis-vertical" size={20} />
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* Shop  Image  */}
      <View style={styles.SliderContainer}>
        <Slider images={images} />
      </View>

      {/* Shop Description  */}
      <View
        style={{
          borderTopColor: Colors.Grey,
          borderTopWidth: 2,
          marginTop: 10,
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 18 }}>About the shop</Text>
        <Text style={{ color: "#444" }}>{s.description}</Text>
      </View>

      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            router.push(
              `/(screens)/ProductsDetails?shopId=${s._id}&name=${s.name}` as never
            );
          }}
        >
          <Text style={styles.btnText}>
            View Products {`(${s.products?.length})`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShopCard;

const styles = StyleSheet.create({
  shopCardBox: {
    width: ScreenWidth * 0.98,
    height: "auto",
    backgroundColor: Colors.White,
    borderRadius: 6,
    marginTop: 10,
    gap: 5,
    padding: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: Colors.Grey,
    paddingHorizontal: 5,
    borderRadius: 6,
    shadowColor: Colors.Primary,
    shadowOpacity: 0.5,
    textShadowOffset: { width: 2, height: 2 },
  },
  IMGBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 5,
  },
  ownerIMG: {
    width: 45,
    height: 45,
    overflow: "hidden",
    borderRadius: 55,
  },
  shopheader: {
    fontSize: 20,
    fontWeight: "600",
  },
  btn: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 6,
  },
  btnText: {
    fontSize: 18,
    color: Colors.White,
    fontWeight: "600",
    textAlign: "center",
  },
  SliderContainer: {
    paddingVertical: 8,
  },
});
