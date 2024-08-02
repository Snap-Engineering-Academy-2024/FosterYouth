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
    <View style={styles.nonprofitContainer}>
      <Pressable //added a presable to give the story interaction
        style={[styles.profile, styles.buttons]}
        onPress={() => {
          navigation.navigate("CampaignScreen", {title:name, photoUrl:photoUrl});
        }}
      >
        <Image
          style={styles.npImage}
          source={{uri: photoUrl}}
        />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        {/* <Text style={styles.usernameText}>Username</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nonprofitContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  npImage: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  title: {
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
});