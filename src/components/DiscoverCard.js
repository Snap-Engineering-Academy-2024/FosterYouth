import react from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  useState,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";

export default function DiscoverCard() {
  return (
    <View style={styles.Square}>
      {/* <Pressable onPress={() => console.log("I was clicked")}> */}
      <ImageBackground
        style={styles.FeedImage}
        imageStyle={{ borderRadius: 20 }}
        source={{
          uri: "https://chronicle.brightspotcdn.com/dims4/default/a126f2a/2147483647/strip/true/crop/5400x3600+0+0/resize/840x560!/quality/90/?url=http%3A%2F%2Fchronicle-brightspot.s3.us-east-1.amazonaws.com%2F61%2Fd0%2Fe4b75dfc4b77b40490c5ed24bfaa%2Fdementoscottbbbg-0524-gabriela-alayna-14.jpg",
        }}
      >
        <Text style={styles.FeedText}>Thank you for watching our story.</Text>
      </ImageBackground>
      {/* </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  Square: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  FeedImage: {
    width: 480,
    height: 420,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  FeedText: {
    padding: 8,
    fontWeight: "700",
    fontSize: 14,
    color: "white",
    position: "absolute",
    right: 40,
    bottom: -40,
    textShadowColor: "#000",
    textShadowOffset: {
      width: -1,
      height: -1,
    },
    textShadowRadius: 1,
    textShadowOpacity: 1,
  },
});
