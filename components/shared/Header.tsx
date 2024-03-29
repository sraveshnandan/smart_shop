import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, ScreenWidth, Screenheight } from "@/constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Logo  */}
      <View style={styles.logoBox}>
        <Ionicons name="bookmarks-sharp" color={Colors.White} size={26}/>
        <Text style={styles.logoText}>Smart Shop</Text>
      </View>
      {/* Right Section  */}
      <View style={{ width: "50%", alignItems: "flex-end", paddingRight: 15 }}>
        <MaterialCommunityIcons name="bell" size={25} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth*1.01,
    backgroundColor: Colors.White,
    paddingVertical: 10,
    height:"auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal:-10,
    shadowColor:"#000",
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.05,
    elevation:1
  },
  logoBox: {
    width: "50%",
    paddingLeft:15,
    alignItems:"center",
    flexDirection:"row",
    gap:8,
    backgroundColor:"#001",
    paddingVertical:10,
    borderBottomRightRadius:6,
    borderTopRightRadius:6
  },
  logoText:{
    fontSize:20,
    fontWeight:"600",
    color:Colors.White
  }
});
