import react from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CampaignTestimonials({url, type}) {
  const navigation = useNavigation();
  return (
    <View style={styles.FeedContainer}>
      <View style={styles.Square}>
        <Pressable
          onPress={() => {
            navigation.navigate("CampaignStoryIndiv", {link:url});
          }}
        >
          <ImageBackground
            style={styles.FeedImage}
            source={{
              uri: url,
            }}
          >
          
          {type ? (
              <Text style={styles.FeedText}>Why I Support</Text>
          ) : (
            <Text style={styles.FeedText}>Hear Our Story</Text>
          )
          }
            
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
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  Square: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap"
  },
  FeedImage: {
    width: 119,
    height: 230,
    display: "flex",
    justifyContent: "center",
    elevation: 5,
  },
  FeedText: {
    padding: 8,
    fontWeight: "900",
    fontSize: 12,
    color: "white",
    position: "absolute",
    bottom: 15,
    textShadowColor: "#292929",
    textShadowRadius: 5,
    textShadowOpacity: 0,
  },
});
