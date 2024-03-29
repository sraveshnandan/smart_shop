import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Colors, ScreenWidth, Screenheight } from "@/constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICategories, IProduct, Ishop } from "@/types";
import { ProductList } from "@/components";
import Animated, {
  FadeInRight,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
const ProfileLink: {
  name: string;
  icon: string | any;
  href?: any;
}[] = [
  {
    name: "Wishlists",
    icon: "heart-outline",
    href: `/(screens)/ProductsDetails`,
  },
  {
    name: "Become a Marchant",
    icon: "storefront-outline",
    href: `/(screens)/BecomeMerchant`,
  },
  {
    name: "Upgrade Account",
    icon: "shield-outline",
    href: `/(screens)/UpgradeAccount`,
  },
];
const Profile = () => {
  const details: any = useSelector((state: RootState) => state.user.details);
  const AllShops: Ishop[] | any = useSelector(
    (state: RootState) => state.user.shops
  );
  const [shopState, setshopState] = useState<boolean>(false);
  const [shopData, setshopData] = useState<Ishop | null>(null);
  const [categories, setcategories] = useState<ICategories[] | []>([]);
  const [scat, setscat] = useState<string[]>([]);
  const [products, setproducts] = useState<IProduct[] | null>();
  const dispatch = useDispatch();

  // Handle button Press
  const handleOnPress = (href: string) => {
    console.log(href);
    if (href === "") {
      return;
    }
    router.push(`${href}` as any);
  };
  // Handle Logout Press
  const handlelogout = () => {
    AsyncStorage.removeItem("token");
    router.push(`/(auth)/`);
  };

  const setUsrShop = () => {
    let usrshop = AllShops[0].filter(
      (s: Ishop) => s.owner?._id === details.user._id
    );
    console.log(usrshop);
  };

  useEffect(() => {
    setUsrShop();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Header  */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          backgroundColor: Colors.Grey,
          paddingVertical: 10,
        }}
      >
        {shopState ? `${shopData?.name}` : "My account"}
      </Text>
      {shopData && shopState ? (
        <Animated.ScrollView
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            flex: 1,
            width: ScreenWidth,
            position: "relative",
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {/* Togglers  */}
          <View
            style={{
              position: "absolute",
              right: 8,
              flexDirection: "row",
              gap: 10,
              backgroundColor: Colors.White,
              padding: 5,
              borderRadius: 6,
              zIndex: 100,
              top: 15,
            }}
          >
            {details.user?.isShopOwner ? (
              <>
                <MaterialCommunityIcons
                  onPress={() =>
                    router.navigate(
                      `/(screens)/EditShop?shop=${shopData.name}&address=${shopData.address}` as never
                    )
                  }
                  size={25}
                  name="pencil-outline"
                />
                {shopState ? (
                  <Ionicons
                    size={25}
                    onPress={() => setshopState((prev) => !prev)}
                    name="person-sharp"
                  />
                ) : (
                  <Ionicons
                    size={25}
                    onPress={() => setshopState((prev) => !prev)}
                    name="storefront-sharp"
                  />
                )}
              </>
            ) : (
              <MaterialCommunityIcons
                onPress={() => router.push(`/(screens)/EditProfile`)}
                size={25}
                name="pencil-outline"
              />
            )}
          </View>
          {/* Shop Image  */}
          <View
            style={{
              backgroundColor: Colors.Grey,
              width: "99%",
              height: Screenheight * 0.3,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            {shopData.images?.length! <= 0 && (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons color={"#666"} size={155} name="storefront-outline" />
              </View>
            )}
          </View>
          {/* Shop Details  */}
          <View style={{ width: "100%", paddingVertical: 15 }}>
            <Text style={{ fontSize: 28 }}>{shopData.name}</Text>
            <Text style={{ color: "#555" }}>{shopData.address}</Text>

            {/* Stats  */}

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 15,
              }}
            >
              {/* Shop followers  */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Colors.Grey,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", marginBottom: 8 }}
                >
                  Followers
                </Text>
                <Text style={{ fontSize: 20, color: Colors.Primary }}>
                  {shopData && shopData.followers === null
                    ? 0
                    : shopData.followers?.length}
                </Text>
              </View>
              {/* Shop View count  */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Colors.Grey,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", marginBottom: 8 }}
                >
                  Views
                </Text>
                <Text style={{ fontSize: 20, color: Colors.Primary }}>
                  {shopData && shopData.followers === null
                    ? 0
                    : shopData.followers?.length}
                </Text>
              </View>

              {/* Shop Products Count  */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Colors.Grey,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", marginBottom: 8 }}
                >
                  Products
                </Text>
                <Text style={{ fontSize: 20, color: Colors.Primary }}>
                  {shopData && shopData.products === null
                    ? 0
                    : shopData.products?.length}
                </Text>
              </View>
            </View>

            {/* Shop description  */}

            <View
              style={{
                width: "100%",
                paddingVertical: 10,
              }}
            >
              {/* Shop Description  */}
              <Text
                style={{ fontWeight: "600", fontSize: 20, marginBottom: 4 }}
              >
                About the shop
              </Text>
              <Text style={{ color: "#444" }}>
                {shopData.description?.substring(0, 180)}...
              </Text>

              <Text style={{ fontWeight: "600", fontSize: 20, marginTop: 15 }}>
                Categories
              </Text>
              {/* Category Lists  */}
              <Animated.View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  paddingVertical: 10,
                }}
              >
                {scat &&
                  scat.map((c) => {
                    return (
                      <Animated.View
                        key={c.substring(0, 6)}
                        entering={FadeInRight}
                        exiting={FadeInUp}
                        style={{
                          backgroundColor: Colors.Grey,
                          width: "46%",
                          padding: 10,
                          borderRadius: 8,
                        }}
                      >
                        {categories.map((cc) => {
                          return (
                            <Text key={cc._id} style={{ fontSize: 20 }}>
                              {cc._id === c ? cc.name : null}
                            </Text>
                          );
                        })}
                      </Animated.View>
                    );
                  })}
              </Animated.View>

              {/* Shops products  */}

              <Text
                style={{ fontSize: 20, fontWeight: "600", marginVertical: 25 }}
              >
                All Products{" "}
              </Text>
              {products && products.length > 0 ? (
                <ScrollView
                  horizontal
                  style={{}}
                  contentContainerStyle={{ alignItems: "center" }}
                >
                  <ProductList products={products!} />
                </ScrollView>
              ) : (
                <Text
                  style={{ color: "#444", fontSize: 18, textAlign: "center" }}
                >
                  No Products Yet.
                </Text>
              )}

              {/* Shop Owner Details  */}

              <Text style={{ fontSize: 25, fontWeight: "600", marginTop: 15 }}>
                Owner
              </Text>
              <View
                style={{
                  backgroundColor: Colors.Grey,
                  alignItems: "center",
                  marginVertical: 10,
                  borderRadius: 8,
                  paddingVertical: 8,
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    padding: 5,
                    backgroundColor: Colors.White,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                    source={
                      !shopData.owner?.avatar.url
                        ? { uri: shopData.owner?.avatar.url }
                        : require("../../assets/images/logo.png")
                    }
                  />
                </View>

                {/* Owner Name  */}
                <Text style={{ fontSize: 25, marginTop: 10 }}>
                  {shopData.owner?.name}
                </Text>
                {/* Owner email  */}
                <Text>{shopData.owner?.email}</Text>

                <TouchableOpacity
                  onPress={() => setshopState((prev) => !prev)}
                  style={{
                    backgroundColor: Colors.Primary,
                    padding: 10,
                    borderRadius: 55,
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ color: Colors.White, fontSize: 16 }}>
                    View profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 20,
            position: "relative",
            marginTop: 8,
          }}
        >
          {/* Togglers  */}
          <View
            style={{
              position: "absolute",
              right: 8,
              flexDirection: "row",
              gap: 10,
              backgroundColor: Colors.Grey,
              padding: 5,
              borderRadius: 6,
            }}
          >
            {details.user?.isShopOwner ? (
              <>
                <MaterialCommunityIcons
                  onPress={() => router.push(`/(screens)/EditProfile`)}
                  size={25}
                  name="pencil-outline"
                />
                {shopState ? (
                  <Ionicons
                    size={25}
                    onPress={() => setshopState((prev) => !prev)}
                    name="person-sharp"
                  />
                ) : (
                  <Ionicons
                    size={25}
                    onPress={() => setshopState((prev) => !prev)}
                    name="storefront-sharp"
                  />
                )}
              </>
            ) : (
              <MaterialCommunityIcons
                onPress={() => router.push(`/(screens)/EditProfile`)}
                size={25}
                name="pencil-outline"
              />
            )}
          </View>

          {/* Avatar Image  */}
          <View
            style={{
              backgroundColor: Colors.Grey,
              borderRadius: 15,
              padding: 0,
              width: ScreenWidth * 0.4,
              height: Screenheight * 0.22,
              overflow: "hidden",
              borderWidth: 0.5,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={
                details.user.avatar.url !== "Sample id."
                  ? { uri: details.user.avatar.url }
                  : require("../../assets/images/logo.png")
              }
            />
          </View>

          {/* User Name  */}
          <Text style={{ marginTop: 10, fontSize: 28 }}>
            {details.user?.name}
          </Text>
          {/* Email  */}
          <Text style={{ fontWeight: "600", color: "#888" }}>
            {details.user?.email}
          </Text>

          {/* Extra links Box  */}
          <View
            style={{
              width: "99%",
              flex: 1,
              paddingTop: 10,
              position: "relative",
              alignItems: "center",
            }}
          >
            {ProfileLink.map((item, index: number) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: Colors.Grey,
                  paddingVertical: 12,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  marginBottom: 15,
                  width: "90%",
                }}
                onPress={() => handleOnPress(item.href)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <Ionicons name={item.icon} first size={35} />
                  <Text style={{ fontSize: 22, fontWeight: "500" }}>
                    {item.name}
                  </Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={30} />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={handlelogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                alignSelf: "flex-start",
                paddingLeft: 15,
              }}
            >
              <Ionicons name="log-out-outline" size={30} color={Colors.Red} />
              <Text style={{ color: Colors.Red, fontSize: 18 }}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
