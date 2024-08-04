import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { colors } from "../../../assets/themes/colors";
import { fontHeader } from "../../../assets/themes/font";
import { Followers, More, Search } from "../../../assets/snapchat/HeaderIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { supabase } from "../../utils/hooks/supabase";
import Ionicons from "react-native-vector-icons/Ionicons";
//npx expo install react-native-svg

import SelectionMenu from "../SelectionMenu";
const Stack = createStackNavigator();

export default function HeaderFund({ }) {
  const navigation = useNavigation();

  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://sdk.bitmoji.com/render/panel/a41da708-81e9-4ec3-9364-9d8748f7063d-f5895c2e-da2d-4413-b1f6-d806dd48e7f5-v1.png?transparent=1&palette=1",
  );

  const { user } = useAuthentication();

  useEffect(() => {
    async function fetchProfilePic() {
      if (user === null) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        // console.log("Profile pic fetch failure");
      } else if (data.avatar_url) {
        setProfilePicUrl(data.avatar_url);
      }
    }

    fetchProfilePic();
  }, [user]);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{borderRadius:50, backgroundColor:"#18191A33" }}>
        <Ionicons 
          name="chevron-down-outline" 
          size={25} 
          color="white"
        />
      </View>

      <View style={styles.headerRight}>
        <View style={{borderRadius:50, backgroundColor:"#18191A33" }}>
          <Ionicons 
            name="arrow-up-circle-outline" 
            size={25} 
            color="white" 
          />
        </View>

        <Pressable title="Open Bottom Sheet" onPress={() => setShowMenu(true)}>
          <View style={[styles.more, styles.buttons]}>
            <More />
          </View>
        </Pressable>
        <SelectionMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor:"gray",
  },
  title: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  buttons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: colors.interactionGraySubtle,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photosIcon: {
    // flex: 1,
    // alignItems: "center",
  },
});
