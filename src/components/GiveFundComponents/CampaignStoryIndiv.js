import react from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRoute } from '@react-navigation/native';

export default function CampaignStoryIndiv() {
  const route = useRoute();
  const { link } = route.params;
  return (
    <View style={styles.Square}>
      <ImageBackground
        style={styles.FeedImage}
        imageStyle={{ borderRadius: 20 }}
        source={{
          uri: link,
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
    backgroundColor: "gray",
    borderRadius: 4,
  },
  FeedImage: {
    width: 480,
    height: 500,
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
    fontSize: 20,
    color: "white",
    position: "absolute",
    left: 50,
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
