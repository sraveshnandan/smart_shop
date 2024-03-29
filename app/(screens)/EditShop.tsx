import {
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, ScreenWidth } from "@/constants";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateShop } from "@/utils/actions";

const EditShop = () => {
  const navigation = useNavigation();
  const shop = useSelector((state: RootState) => state.user.shop);
  const [name, setName] = useState<string>(shop?.name!);
  const [description, setDescription] = useState<string>(shop?.description!);
  const [address, setAddress] = useState<string>(shop?.address!);

  const handleSave = async () => {
    const res = await updateShop(name, description, address,shop?._id!);
    console.log("res", res)
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit shop details",
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        width: ScreenWidth,
        backgroundColor: "#fff",
      }}
    >
      {/* Shop Image  */}

      <View
        style={{
          width: "95%",
          height: 250,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.Grey,
          marginVertical: 10,
          borderRadius: 6,
        }}
      >
        <Ionicons name="storefront-outline" size={200} color={"#666"} />
      </View>
      {/* Form field  */}
      <View
        style={{
          marginVertical: 10,
          width: "95%",
          alignItems: "flex-start",
        }}
      >
        <Text>Shop Name</Text>
        <TextInput
          placeholder={shop?.name}
          style={{
            width: "100%",
            backgroundColor: Colors.Grey,
            paddingVertical: 14,
            fontSize: 20,
            marginTop: 10,
            borderRadius: 6,
            paddingLeft: 8,
          }}
          onChangeText={setName}
          value={name}
        />
      </View>

      <View
        style={{
          marginVertical: 10,
          width: "95%",
          alignItems: "flex-start",
        }}
      >
        <Text>Shop Descrition</Text>
        <TextInput
          placeholder={shop?.description}
          style={{
            width: "100%",
            backgroundColor: Colors.Grey,
            fontSize: 20,
            marginTop: 10,
            borderRadius: 6,
            paddingLeft: 8,
            paddingVertical: 14,
          }}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View
        style={{
          marginVertical: 10,
          width: "95%",
          alignItems: "flex-start",
        }}
      >
        <Text>Shop Address</Text>
        <TextInput
          placeholder={shop?.address}
          style={{
            width: "100%",
            backgroundColor: Colors.Grey,
            fontSize: 20,
            marginTop: 10,
            borderRadius: 6,
            paddingLeft: 8,
            paddingVertical: 14,
          }}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.Primary,
          width: "95%",
          paddingVertical: 15,
          borderRadius: 6,
        }}
        onPress={handleSave}
      >
        <Text
          style={{ fontSize: 20, color: Colors.White, textAlign: "center" }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditShop;

const styles = StyleSheet.create({});
