import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, Sliders } from "@/constants";

const imageSlider = () => {
  const { width } = Dimensions.get("window");
  const height = width * 0.7;

  const [active, setActive] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const onScrollChange = ({ nativeEvent }: { nativeEvent: any }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (active < Sliders.length - 1) {
        scrollViewRef.current?.scrollTo({
          x: (active + 1) * width,
          animated: true,
        });
        setActive(active + 1);
      } else {
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
        setActive(0);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [active, Sliders.length]);
  return (
    <View style={{ height: 200 }}>
      <ScrollView
        horizontal
        pagingEnabled={true}
        onScroll={onScrollChange}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width, height, position: "relative" }}
        ref={scrollViewRef}
        scrollEventThrottle={16}
      >
        {Sliders &&
          Sliders.map((item, index) => (
            <Image
              key={index}
              style={{
                width: width * 0.9,
                height: "100%",
                resizeMode: "contain",
                backgroundColor: Colors.White,
                borderRadius: 6,
              }}
              source={item.image}
            />
          ))}
      </ScrollView>
      <View style={styles.pagination}>
        {Sliders.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            •
          </Text>
        ))}
      </View>
    </View>
  );
};

export default imageSlider;

const styles = StyleSheet.create({
  imageText: {
    fontSize: 28,
    color: Colors.White,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    gap: 10,
    alignSelf: "center",
  },
  dot: {
    color: "#888",
    fontSize: 40,
  },
  activeDot: {
    color: Colors.Primary,
    fontSize: 40,
  },
});
