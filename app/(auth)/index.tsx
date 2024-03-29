import {
  ActivityIndicator,
  Alert,
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
import { setUserData } from "@/redux/reducers/user.reducer";
import { RootState } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchedUserProfile } from "@/utils/actions";
import { Loader } from "@/components";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.details);
  const [state, setState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchedUserProfile((profile) => {
      setLoading(false);

      if (profile === "") {
        console.log(typeof profile);
        return setLoading(false);
      }
      dispatch(setUserData(profile));
      setState(true);
    });
    if (state) {
      router.replace(`/(tabs)/home`);
    }
  }, [state]);

  const query = gql`
    query loginUser($loginData: UserInput) {
      login(data: $loginData) {
        message
        token
        user {
          _id
          email
          name
          avatar {
            url
          }
          isAdmin
          isShopOwner
          shops {
            _id
          }
        }
      }
    }
  `;

  const variables = {
    loginData: {
      email: `${Email}`,
      password: `${Password}`,
    },
  };

  const handleLogin = () => {
    setLoading(true);
    if (!Email || !Password) {
      setLoading(false);
      return Alert.alert("Input Error", "Please fill all the fields.");
    }
    console.log(variables);
    gql_client
      .request(query, variables)
      .then((res: any) => {
        console.log(res as any);

        if (res?.login?.message) {
          dispatch(setUserData({ ...res.login }));
          AsyncStorage.setItem("token", res.login.token);
          console.log(`Authenticated.`);
          setLoading(false);
          setState(true);
        }
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  };

  return loading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loader />
    </View>
  ) : (
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
      <Animated.View
        entering={FadeInUp}
        exiting={FadeInDown}
        style={styles.formContainer}
      >
        <Text style={styles.formHeader}>Welcome back 👋</Text>

        <KeyboardAvoidingView
          style={{
            width: "100%",
          }}
        >
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
        </KeyboardAvoidingView>

        {/* Extra fields  */}
        <View style={styles.extraFields}>
          <TouchableOpacity
            onPress={() => router.push(`/(auth)/forgotPassword`)}
          >
            <Text style={{ fontSize: 18, color: Colors.Secondry }}>
              forgot password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button  */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={{ color: "#fff", fontSize: 24 }}>
            {loading ? <ActivityIndicator size={22} /> : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Register Links  */}

        <View>
          <Text
            style={{
              fontSize: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            Don't have an account?
            <TouchableOpacity
              style={{ alignItems: "center", width: "auto" }}
              onPress={() => router.push(`/(auth)/register`)}
            >
              <Text
                style={{ marginLeft: 5, fontSize: 18, color: Colors.Secondry }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Login;

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
    paddingVertical: 12,
    fontSize: 22,
    borderRadius: 4,
    marginTop: 15,
  },
  loginBtn: {
    paddingVertical: 12,
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
