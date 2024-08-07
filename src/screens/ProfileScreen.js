import { Image, Text, View, Button, StyleSheet, Pressable, Dimensions, ImageBackground } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; // yarn add @gorhom/bottom-sheet
import ProfileHeader from "../components/ProfileHeader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProfileScreen(){
  const navigation = useNavigation();
  const sheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/snapchat/JadeBitmojiPlusBackground.png")} style={styles.image}>
        <BottomSheet
          ref={sheetRef}
          index={3}
          snapPoints={["35", "48", "58", "68", "78", "85"]}
        >
          <View style={styles.sections}>
            <Text>Hello</Text>
          </View>
        </BottomSheet>
        <View style={{ position: "absolute", top: 50 }}>
          <ProfileHeader />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  bottomsheet: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    backgroundColor: "white",
    padding: 25,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
    top: SCREEN_HEIGHT / 3.5,
  },
});

