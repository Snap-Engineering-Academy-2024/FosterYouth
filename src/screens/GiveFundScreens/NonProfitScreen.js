import { Image, Text, View, Button, StyleSheet, Pressable, Dimensions, ImageBackground, ScrollView, FlatList } from "react-native";
import { supabase } from "../../utils/hooks/supabase";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; // yarn add @gorhom/bottom-sheet
import { fontHeader } from "../../../assets/themes/font";
import { colors } from "../../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileHeader from "../../components/ProfileHeader";
import CampaignTestimonials from "../../components/GiveFundComponents/CampaignTestimonials";
import FollowButton from "../../components/GiveFundComponents/FollowButton";
import * as Progress from "react-native-progress"; //yarn add react-native-progress --save

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function NonProfitScreen({ route, navigation }){
  const sheetRef = useRef(null);
  const { id, originScreen } = route.params; //Destructure any props that were passed in
  const [followNum, setFollowNum] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [nonprofits, setNonprofits] = useState([]);

  const [amount, setAmount] = useState(0);

  // if (amount != updatedDonationAmount) {
  //   fetchNonprofits();
  // }

  ///SUPABASE CALL
  //SELECT * where ID is ___
  async function fetchNonprofits() {
    try {
      const { data, error } = await supabase
        .from("nonprofits")
        .select("*")
        .eq("registrationNumber", id);
      if (error) {
        console.error("Error fetching nonprofits:", error.message);
        return;
      }
      if (data) {
        setNonprofits(data);
        setFollowNum(data[0].followers);
        setAmount(data[0].currentAmount);
      }
    } catch (error) {
      console.error("Error fetching Nonprofits:", error.message);
    }
  }

  useEffect(() => {
    fetchNonprofits();
  }, [originScreen]);

  if (nonprofits.length === 0) {
    return null; // or render a loading spinner
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri:"https://pbs.twimg.com/media/EZwpCsAUEAAg_zZ.jpg"}} style={styles.image}>
        <BottomSheet
          ref={sheetRef}
          index={3}
          snapPoints={["35", "48", "58", "68", "78", "85"]}
        >
          <View style={styles.mainInfoContainer}>
            <View style={styles.titleContainer}>
              <Image
                style={styles.logo}
                source={{ uri: nonprofits[0].imageUrl }}
              />
              <View>
                <Text style={styles.mainTitle}>{nonprofits[0].name}</Text>
                  <Text style={styles.followers}>
                    NonProfit • {followNum} Community Members
                  </Text>
              </View>
            </View>

            <View style={styles.row}>
              <FollowButton
                followNum={followNum}
                setFollowNum={setFollowNum}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
              />

              <Pressable
                style={[styles.buttonStyle, { flex: 0.85 }]}
                onPress={() => {
                  navigation.navigate("GiveScreen", { id: id });
                }}
              >
                <View style={styles.row}>
                  <Ionicons name="gift-outline" color="white" size={20} />
                  <Text style={styles.buttonText}> Give</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* can make this section a component to work on Bitmoji head */}
          <View style={styles.progressSection}>
            <Progress.Bar
              progress={amount / nonprofits[0].goals[0]}
              width={350}
              height={15}
              borderRadius={50}
            />
            <Text
              style={[
                {
                  color: colors.primary,
                  fontSize: fontHeader.fontSize,
                  fontFamily: fontHeader.fontFamily,
                  textAlign: "center",
                  paddingVertical: 10,
                  fontSize: 20,
                },
              ]}
            >
              ${amount} raised out of ${nonprofits[0].goals[0]} goal
            </Text>
          </View>

        <View style={styles.storiesSection}>
          <Pressable onPress={() => Linking.openURL(nonprofits[0].websiteUrl)}>
            <View style={[styles.aboutSection]}>
              <Text
                style={[styles.sectionHeader, { fontSize: 18, color: "white" }]}
              >
                About
              </Text>
              <View style={[styles.aboutContent]}>
                {/* <Text style={{padding:10}}>{nonprofits[0].name} Website</Text> */}
                <Text style={[styles.aboutContent, { padding: 10 }]}>
                  {nonprofits[0].bio}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>Stories</Text>
          <Text
            style={[styles.sectionHeader, { fontSize: 14, fontWeight: "400" }]}
          >
            Watch a story to support {nonprofits[0].name}!
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.sectionContent}
          >
            {nonprofits[0].stories.length > 0 ? (
              <FlatList
                data={nonprofits[0].stories}
                horizontal={false}
                numColumns={nonprofits[0].stories.length}
                ItemSeparatorComponent={() => <View style={{ height: "1%" }} />}
                // columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => <CampaignTestimonials url={item} />}
                keyExtractor={(item) => item}
              />
            ) : (
              <Text>No "usersToAdd" table</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>Friends</Text>
          <View
            style={[styles.sectionContent, { justifyContent: "space-between" }]}
          >
            <Text style={{ padding: 10 }}>Invite Friends</Text>
            <Ionicons
              name="people-outline"
              size={20}
              color="black"
              style={{ padding: 10 }}
            />
          </View>
        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>My Stories</Text>
          <View
            style={[styles.sectionContent, { justifyContent: "space-between" }]}
          >
            <Text style={{ padding: 10 }}>Add to my story</Text>
            <Ionicons
              name="camera-outline"
              size={20}
              color="black"
              style={{ padding: 10 }}
            />
          </View>
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
  },container: {
    flex: 1,
    // backgroundColor: "black"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  bitmojiContainer: {
    // padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    backgroundColor: "transparent",
  },
  headerImage: {
    // position:"absolute",
    resizeMode: "cover",
    width: 700,
    height: 100,
    marginTop: 50,
  },
  mainInfoContainer: {
    textAlign: "center",
    // alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically if needed
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mainTitle: {
    // alignItems: 'center',
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 4,
    color: "black",
    fontSize: 25,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  logo: {
    alignSelf: "center",
    resizeMode: "cover",
    width: 66,
    height: 70,
    marginRight: 10,
    borderRadius: 100,
    borderColor: "#A05DCD",
    borderWidth: 3,
  },
  storiesSection: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "column",
  },
  stories: {
    display: "flex",
    gap: 12,
    width: "100%",
  },
  sectionHeader: {
    textAlign: "left",
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  sectionContent: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#E8E8E8",
    shadowOffset: { width: -5, height: 4 },
    shadowRadius: 25,
  },
  buttonStyle: {
    alignItems: "center",
    // alignSelf:"center",
    justifyContent: "center",
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#038588",
    // width:"80%"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  progressSection: {
    alignSelf: "center",
    padding: 15,
  },
  aboutSection: {
    alignItems: "center",
    backgroundColor: "#0FADFF",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#E8E8E8",
    shadowOffset: { width: -5, height: 4 },
    shadowRadius: 25,
  },
  aboutContent: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  followers: {
    fontWeight: "600",
    fontSize: 14
  },
  row: {
    display: "flex", 
    flexDirection: "row"
  }
});