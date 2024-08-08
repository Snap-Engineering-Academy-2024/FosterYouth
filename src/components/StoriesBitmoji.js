import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// import StoriesBitmoji from "../components/StoriesBitmoji";

export default function StoriesBitmoji({image, name, username}) {
  const navigation = useNavigation();
  return (
    <View style={styles.myBitmoji}>
      <Pressable style={styles.storyHighlight}>
        <Image
          style={styles.bitmojiImage}
          source={image}
        />
      </Pressable>

      <View style={styles.bitmojiTextContainer}>
        <Text style={styles.bitmojiText}>{name}</Text>
        <Text style={styles.usernameText}>{username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myBitmoji: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },

  storyHighlight: {
    padding: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#a05dcd"
  },

  bitmojiImage: {
    width: 55,
    height: 55,
    
  },

  bitmojiTextContainer: {
    // backgroundColor: "white",
    // borderRadius: 20,
    padding: 4,
  },

  bitmojiText: {
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "700",
  },

  usernameText: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.3,
  },

  Friends: {
    textAlign: "left",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
});
