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

export default function DiscoverFeed({title, subtitle, photoLink, type, video}) {
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
            navigation.navigate("VideoScreen", {videoUrlLink:video});
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
              <View style={styles.textContainer}>
                <Text style={[styles.FeedText, {marginBottom:-10}]}>{title}</Text>
                <View style={styles.row}>
                  <Image 
                    source={require("../../assets/buttons/snapStarBadge.png")}
                    style={styles.FeedBadge}
                  />
                  <Text style={styles.FeedTextSubtitle}>{subtitle}</Text>
                </View>
                
              </View>
            ) : (
              <></>
            )
            }
            {type=="nonprofit" ? (
              <View style={styles.textContainer}>
              <Text style={[styles.FeedText, {marginBottom:-10}]}>{title}</Text>
              <View style={styles.row}>
                <Image 
                  source={require("../../assets/buttons/nonprofitBadge.png")}
                  style={styles.FeedBadge}
                />
                <Text style={styles.FeedTextSubtitle}>{subtitle}</Text>
              </View>
              
            </View>
            ) : (
              <></>
            )
            }
            {type=="regular" ? (
              <View style={styles.textContainer}>
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
  },
  FeedTextSubtitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textShadowColor: "#292929",
    textShadowRadius: 5,
    textShadowOpacity: 0,
  },
  textContainer:{
    alignItems: "center", 
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "flex-start"
  },
  row:{
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    width:"100%"
  },
  FeedBadge: {
    width:17,
    height:17,
    resizeMode:"contain",
    marginLeft:5,
  }
});
