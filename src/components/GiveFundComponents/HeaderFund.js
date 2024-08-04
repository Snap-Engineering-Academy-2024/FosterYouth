import { View, StyleSheet } from "react-native";
import { colors } from "../../../assets/themes/colors";
import { fontHeader } from "../../../assets/themes/font";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { supabase } from "../../utils/hooks/supabase";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <View style={[styles.more, styles.buttons]}>
        <Ionicons 
          name="chevron-down-outline" 
          size={20} 
          color="gray"
        />
      </View>

      <View style={styles.headerRight}>
        <View style={[styles.more, styles.buttons]}>
          <Ionicons 
            name="push-outline" 
            size={20} 
            color="gray" 
          />
        </View>

        <Pressable title="Open Bottom Sheet" onPress={() => setShowMenu(true)}>
          <View style={[styles.more, styles.buttons]}>
          <Ionicons 
            name="ellipsis-horizontal-outline" 
            size={20} 
            color="gray" 
          />
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
    height: 30,
    width: 30,
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
