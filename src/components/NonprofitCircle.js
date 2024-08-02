import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Header from "./Header";

export default function NonprofitCircle({name, photoUrl}) {
  const navigation = useNavigation();
  return (
    <View style={styles.myBitmoji}>
      <Pressable //added a presable to give the story interaction
        style={[styles.profile, styles.buttons]}
        onPress={() => {
          navigation.navigate("FriendStory");
        }}
      >
        <Image
          style={styles.bitmojiImage}
          source={{uri: photoUrl}}
        />
      </Pressable>
      <View style={styles.bitmojiTextContainer}>
        <Text style={styles.bitmojiText}>{name}</Text>
        {/* <Text style={styles.usernameText}>Username</Text> */}
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
  bitmojiImage: {
    width: 60,
    height: 60,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
    width:70
  },
  usernameText: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.5,
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
