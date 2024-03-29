import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { gql } from "graphql-request";
import { gql_client } from "@/utils";
import { Colors, Screenheight, defaultStyle } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.details);

  const [state, setState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [Name, setName] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  useEffect(() => {
    if (state) {
      router.push(`/(tabs)/home`);
    }
    console.log(user);
  }, [state]);

  const query = gql`
    mutation RegisterFunction($UserData: UserInput) {
      createUser(data: $UserData) {
        message
        user {
          _id
        }
      }
    }
  `;

  const variables = {
    UserData: {
      name: `${Name}`,
      email: `${Email}`,
      password: `${Password}`,
    },
  };

  const handleLOgin = () => {
    setLoading(true);
    if (Name === "" || Email === "" || Password === "") {
      setLoading(false);
      return alert("Please fill all fields.");
    }
    gql_client
      .request(query, variables)
      .then((res: any) => {
        console.log(res as any);
        setLoading(false);
        router.push(`/(auth)/`);
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  };

  return (
    <View style={defaultStyle.container}>
      {/* logo container  */}
      <View style={styles.logoContainer}>
        <View
          style={{
            width: 150,
            height: "50%",
            borderTopRightRadius: 22,
            borderBottomLeftRadius: 22,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={require("../../assets/images/logo.png")}
          />
        </View>
      </View>

      {/* Form Container  */}
      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.formHeader}>Register Here 👇</Text>

        <TextInput
          style={styles.inputBox}
          placeholder="Full name"
          onChangeText={setName}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Email address"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        {/* Login Button  */}
        <TouchableOpacity onPress={handleLOgin} style={styles.loginBtn}>
          <Text style={{ color: "#fff", fontSize: 24 }}>
            {loading ? (
              <ActivityIndicator color={Colors.White} size={28} />
            ) : (
              "Register"
            )}
          </Text>
        </TouchableOpacity>

        {/* Register Links  */}

        <View>
          <Text style={{ fontSize: 16 }}>
            Already have an account?
            <TouchableOpacity onPress={() => router.push(`/(auth)/`)}>
              <Text
                style={{ marginLeft: 5, fontSize: 18, color: Colors.Secondry }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  logoContainer: {
    height: Screenheight * 0.35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary,
  },
  formContainer: {
    alignItems: "center",
    flex: 1,
    marginTop: -20,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
  },
  formHeader: {
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 20,
    alignSelf: "flex-start",
    color: Colors.Primary,
  },
  inputBox: {
    width: "100%",
    backgroundColor: Colors.Grey,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 22,
    borderRadius: 4,
    marginTop: 15,
  },
  loginBtn: {
    paddingVertical: 13,
    backgroundColor: Colors.Black,
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  extraFields: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "flex-end",
  },
});
