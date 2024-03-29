import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, ScreenWidth } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const forgotPassword = () => {
  const handleForgotPassword = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.formBox}>
        <TouchableOpacity
          onPress={() => router.push(`/(auth)/`)}
          style={{
            width: "100%",
            marginVertical: 10,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back-sharp" size={20} />
          <Text
            style={{ color: Colors.Black, fontWeight: "600", fontSize: 18 }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 28, color: Colors.Primary }}>
            Forgot password
          </Text>
          <Text style={{ color: "#444" }}>
            we'll send a password reset link to your email.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLable}> Enter your Email</Text>
          <TextInput style={styles.inputBox} placeholder="Email " />
        </View>
        <TouchableOpacity onPress={handleForgotPassword} style={styles.Btn}>
          <Text style={{ color: Colors.White, fontSize: 22 }}>Send Email</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
  formBox: {
    backgroundColor: Colors.White,
    width: ScreenWidth * 0.95,
    borderRadius: 8,
    padding: 10,
    shadowColor: "red",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
  },
  inputContainer: {},
  inputLable: {
    fontSize: 19,
  },
  inputBox: {
    width: "100%",
    backgroundColor: Colors.Grey,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 22,
    borderRadius: 4,
    marginTop: 5,
  },
  Btn: {
    paddingVertical: 13,
    backgroundColor: Colors.Black,
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
});
