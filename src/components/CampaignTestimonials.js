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
import { useNavigation } from "@react-navigation/native";

export default function CampaignTestimonials() {
  const navigation = useNavigation();
  return (
    <View style={styles.FeedContainer}>
      <View style={styles.Square}>
        <Pressable
          onPress={() => {
            navigation.navigate("CampaignStoryIndiv");
          }}
        >
          <ImageBackground
            style={styles.FeedImage}
            imageStyle={{ borderRadius: 20 }}
            source={{
              uri: "https://eccles.utah.edu/wp-content/uploads/2017/02/snapchat.jpg",
            }}
          >
            <Text style={styles.FeedText}>Hear Our Story</Text>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  FeedContainer: {
    width: "100%",
    display: "flex",
    flex: 2,
    gap: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  Square: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    height:"100%",
    width: "100%",
    alignItems: "center",
    // backgroundColor: "pink",
    alignItems: "center",
    borderRadius: 20,
    flexWrap: "wrap",
    marginRight: 10
  },
  FeedImage: {
    width: 100,
    height: 150,
    display: "flex",
    justifyContent: "center",
    elevation: 5, 
  },
  FeedText: {
    padding: 8,
    fontWeight: "900",
    fontSize: 14,
    color: "white",
    position: "absolute",
    right: 15,
    bottom: 15,
    textShadowColor: "#292929",

    textShadowRadius: 5,
    textShadowOpacity: 0,
  },
  smallFeedText: {},
});
