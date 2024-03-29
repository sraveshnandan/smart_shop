import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Screenheight } from "@/constants";

const Loader = () => {
  return (
      <View style={styles.loadingContainer}>
      <ActivityIndicator size={50} color={Colors.Primary} animating={true} />
      <Text style={styles.loadingText}>loading.....</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    height:Screenheight
  },
  loadingContainer: {
    width: "80%",
    backgroundColor: Colors.White,
    borderRadius:9,
    height:Screenheight*0.25,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
  },
  loadingText:{
    fontSize:20,
    fontWeight:"600",
    marginTop:15
  }
});
