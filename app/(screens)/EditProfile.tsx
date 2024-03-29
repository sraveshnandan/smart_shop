import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IUser } from "@/types";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Colors, ScreenWidth } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigation } from "expo-router";
import { uploadImage } from "@/utils/actions";

const EditProfile = () => {
  const navigation = useNavigation();
  const details: any = useSelector((state: RootState) => state.user.details);
  const [profile, setprofile] = useState<IUser | null>(details.user);
  const [userImg, setuserImg] = useState<string | null>(
    details.user.avatar.url
  );
  const [upateData, setupateData] = useState<string>("");

  const [loading, setloading] = useState<boolean>(false);

  // Handle Image Pick

  const handleImgaePick = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    };
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync(options as any);
      if (!result.canceled) {
        setuserImg(result.assets[0].uri);
        const { uri } = result.assets[0];
        setloading(true);
        uploadImage(uri)
          .then((res) => {
            setloading(false);
            console.log(res);
          })
          .catch((e) => {
            setloading(false);
            console.log(e);
          });
      } else {
        console.log("Image Picker initiciated.");
        let result = await ImagePicker.launchImageLibraryAsync(options as any);
        if (!result.canceled) {
          setuserImg(result.assets[0].uri);
          const { uri } = result.assets[0];
          setloading(true);
          uploadImage(uri)
            .then((res) => {
              setloading(false);
              console.log(res);
            })
            .catch((e) => {
              setloading(false);
              console.log(e.message);
            });
        } else {
          console.log("Image picker cancled.");
          Alert.alert("Request cancled.", "Please select at least one img.");
        }
      }
    } else {
      console.log("Image Picker initiciated.");
      let result = await ImagePicker.launchImageLibraryAsync(options as any);
      if (!result.canceled) {
        setuserImg(result.assets[0].uri);
        const { uri } = result.assets[0];
        setloading(true);
        uploadImage(uri)
          .then((res) => {
            setloading(false);
            console.log(res);
          })
          .catch((e) => {
            setloading(false);
            console.log(e.message);
          });
      } else {
        console.log("Image picker cancled.");
        Alert.alert("Request cancled.", "Please select at least one img.");
      }
    }
  };

  // Handle Save
  const handleSave = () => {
    console.log(`Data saved successfully.`);
    Alert.alert("Data saved successfully.");
  };

  useLayoutEffect(() => {
    setloading(false);
    navigation.setOptions({
      headerTitle: "Edit your profile",
    });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: Colors.White }}
    >
      {profile && (
        <Animated.View
          style={{
            width: ScreenWidth,
            backgroundColor: Colors.White,
            flex: 1,
            alignItems: "center",
            paddingVertical: 10,
            position: "relative",
          }}
          entering={FadeInUp}
        >
          {loading && (
            <View
              style={{
                borderWidth: 1,
                backgroundColor: Colors.Grey,
                gap: 15,
                padding: 5,
                borderRadius: 6,
                position: "absolute",
                bottom: 15,
                flexDirection: "row",
                width: ScreenWidth * 0.8,
              }}
            >
              <ActivityIndicator />
              <Text style={{ fontSize: 16 }}>
                Uploading image please wait...
              </Text>
            </View>
          )}
          {/* User Avatar Section  */}
          {profile.avatar.url !== "sample id" ? (
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: Colors.Grey,
                position: "relative",
                borderRadius: 15,
                overflow: "hidden",
                borderWidth: 0.5,
              }}
            >
              <Image
                style={{ width: "100%", height: "100%", resizeMode: "center" }}
                source={{ uri: userImg! }}
              />
              <View
                style={{
                  backgroundColor: Colors.White,
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  borderRadius: 55,
                  padding: 5,
                }}
              >
                <Ionicons
                  name="cloud-upload"
                  size={25}
                  onPress={handleImgaePick}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: Colors.Grey,
                position: "relative",
              }}
            >
              <Ionicons name="person" size={150} />
              <Ionicons
                name="cloud-upload-outline"
                size={25}
                style={{
                  backgroundColor: Colors.White,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  borderRadius: 55,
                }}
                onPress={handleImgaePick}
              />
            </View>
          )}

          {/* User Details Sections  */}
          <KeyboardAvoidingView
            style={{
              width: "100%",
              marginTop: 15,
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            {/* Name field  */}
            <View
              style={{
                backgroundColor: Colors.Grey,
                width: "90%",
                gap: 10,
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 8,
                marginBottom: 15,
              }}
            >
              <Ionicons name="person" size={25} />

              <TextInput
                placeholder={profile.name}
                style={{ width: "100%", fontSize: 18, padding: 5 }}
                onChangeText={(value) => console.log(value)}
              />
            </View>
            {/* Email field  */}

            <View
              style={{
                backgroundColor: Colors.Grey,
                width: "90%",
                gap: 10,
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 8,
                marginBottom: 15,
              }}
            >
              <Ionicons name="mail-unread-sharp" size={25} />

              <TextInput
                placeholder={profile.email}
                style={{ width: "100%", fontSize: 18, padding: 5 }}
                onChangeText={(value) => console.log(value)}
              />
            </View>

            {/* Phone Number  */}

            <View
              style={{
                backgroundColor: Colors.Grey,
                width: "90%",
                gap: 10,
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 8,
                marginBottom: 15,
              }}
            >
              <Ionicons name="phone-portrait-sharp" size={25} />

              <TextInput
                placeholder="+91 91261 *****"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                onChangeText={(value) => console.log(value)}
                style={{ width: "100%", fontSize: 18, padding: 5 }}
              />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={[
              {
                backgroundColor: Colors.Primary,
                paddingVertical: 15,
                width: "90%",
                borderRadius: 8,
                marginTop: 20,
              },
              loading ? { backgroundColor: "#444" } : null,
            ]}
            disabled={loading}
            onPress={handleSave}
          >
            <Text
              style={{ color: Colors.White, fontSize: 25, textAlign: "center" }}
            >
              {loading ? "Please wait..." : "Save"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;
