import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "./Colors";

//Default screen size
export const ScreenWidth = Dimensions.get("screen").width;
export const Screenheight = Dimensions.get("screen").height;
// Default style
export const defaultStyle = StyleSheet.create({
  container: {
    width: ScreenWidth * 1,
    flex: 1,
    backgroundColor: Colors.AliceBlue,
  },
});
