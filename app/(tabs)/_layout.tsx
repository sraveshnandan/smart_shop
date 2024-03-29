import { Colors, ScreenWidth } from "@/constants";
import { RootState } from "@/redux/store";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TabLayout = () => {
  const details:any = useSelector((state: RootState) => state.user.details);
  const [addHref, setAddHref] = useState<string | null>(null);
  const [shopOwner, setshopOwner] = useState<boolean>(
    details.user?.isShopOwner
  );
  useEffect(() => {
    if (shopOwner) {
      setAddHref("/Add");
    }
  }, [shopOwner]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.Primary,
        tabBarStyle: {
          minHeight: 60,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: Colors.Black,
          padding: 8,
          width: ScreenWidth,
          marginHorizontal: "auto",
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 16,
          marginTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarLabel: "Wishlist",

          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "add-sharp" : "add-outline"}
              size={25}
              color={color}
            />
          ),
          href: addHref,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",

          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
