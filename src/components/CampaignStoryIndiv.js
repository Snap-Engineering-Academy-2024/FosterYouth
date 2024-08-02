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
import { colors } from "../../assets/themes/colors";

export default function CampaignStoryIndiv() {
  return (
    <View style={styles.Square}>
      <ImageBackground
        style={styles.FeedImage}
        imageStyle={{ borderRadius: 20 }}
        source={{
          uri: "https://eccles.utah.edu/wp-content/uploads/2017/02/snapchat.jpg",
        }}
      >
        <Text style={styles.FeedText}>Thank you for watching our story</Text>
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
    borderRadius: 12,
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
    right: 15,
    bottom: 15,
    textShadowColor: "#000",
    textShadowOffset: {
      width: -1,
      height: -1,
    },
    textShadowRadius: 1,
    textShadowOpacity: 1,
  },
});
