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
import { useNavigation } from "@react-navigation/native";

export default function DiscoverFeed({title, photoLink, type}) {
  const navigation = useNavigation();
  //  const [discoverCard, setDiscoverCard] = useState(false);
  //  const handlePress = () => {
  //   setDiscoverCard(true);
  // };

  // const handleClose = () => {
  //   setDiscoverCard(false);
  // };
  return (
    <View style={styles.FeedContainer}>
      <View style={styles.Square}>
        <Pressable
          onPress={() => {
            navigation.navigate("VideoScreen");
          }}
        >
          <ImageBackground
            style={styles.FeedImage}
            imageStyle={{ borderRadius: 5 }}
            source={{
              uri: photoLink,
            }}
          >
            {type=="snapstar" ? (
              <View style={styles.row}>
                <Text style={styles.FeedText}>{title}</Text>
                <Image 
                  source={require("../../assets/buttons/snapStarBadge.png")}
                  style={styles.FeedBadge}
                />
              </View>
            ) : (
              <></>
            )
            }
            {type=="nonprofit" ? (
              <View style={styles.row}>
                <Text style={styles.FeedText}>{title}</Text>
                <Image 
                  source={require("../../assets/buttons/nonprofitBadge.png")}
                  style={styles.FeedBadge}
                />
              </View>
            ) : (
              <></>
            )
            }
            {type=="regular" ? (
              <View style={styles.row}>
                <Text style={styles.FeedText}>{title}</Text>
              </View>
            ) : (
              <></>
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
    gap: 10,
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
    alignItems: "center",
    borderRadius: 20,
    flexWrap: "wrap",
  },
  FeedImage: {
    width: 180,
    height: 320,
    display: "flex",
    justifyContent: "center",
    // borderRadius: 50,
    // backgroundColor:"blue",
    // borderRadius:20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
  },
  FeedText: {
    padding: 8,
    fontWeight: "900",
    fontSize: 14,
    color: "white",
    textShadowColor: "#292929",
    textShadowRadius: 5,
    textShadowOpacity: 0,
    marginLeft:5
  },
  row:{
    display: "flex",
    flexDirection: "row", 
    alignItems: "center", 
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "flex-start",
  },
  FeedBadge: {
    width:20,
    height:20,
    resizeMode:"contain",
    marginLeft:5,
  }
});
