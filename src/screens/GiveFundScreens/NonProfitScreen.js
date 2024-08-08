import { Image, Text, View, Button, StyleSheet, Pressable, Dimensions, ImageBackground, ScrollView, FlatList, Linking, useWindowDimensions } from "react-native";
import { supabase } from "../../utils/hooks/supabase";
import { useEffect, useState, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; // yarn add @gorhom/bottom-sheet
import { fontHeader } from "../../../assets/themes/font";
import { colors } from "../../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileHeader from "../../components/ProfileHeader";
import CampaignTestimonials from "../../components/GiveFundComponents/CampaignTestimonials";
import FollowButton from "../../components/GiveFundComponents/FollowButton";
import * as Progress from "react-native-progress"; //yarn add react-native-progress --save
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'; //yarn add react-native-tab-view //AND yarn add react-native-pager-view //npx expo install react-native-pager-view
import communityList from '../../../assets/communityList'

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

  //~~~~~~~~~~~~~~STORIES COMMUNITIES TABS
  const FirstRoute = () => (
    <View style={styles.storiesSection}>
      <Text
        style={[styles.sectionHeader, { fontSize: 14, fontWeight: "400" }]}
      >
        Watch a story to support {nonprofits[0].name}!
      </Text>
        {nonprofits[0].stories.length > 0 ? (
          <FlatList
            nestedScrollEnabled
            data={nonprofits[0].stories}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            renderItem={({ item }) => <CampaignTestimonials url={item} />}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        ) : (
          <Text>No stories data found</Text>
        )}
    </View>
  );
  const SecondRoute = () => (
    <View style={styles.storiesSection}>
      <Text
        style={[styles.sectionHeader, { fontSize: 14, fontWeight: "400" }]}
      >
        See how people are getting involved with {nonprofits[0].name}!
      </Text>
        {nonprofits[0].stories.length > 0 ? (
          <FlatList
            nestedScrollEnabled
            data={communityList}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            renderItem={({ item }) => <CampaignTestimonials url={item.link} type={item.type} />}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        ) : (
          <Text>No stories data found</Text>
        )}
    </View>
  );
  const renderScene = SceneMap({
    stories: FirstRoute,
    community: SecondRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'stories', title: 'Stories' },
    { key: 'community', title: 'Community' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#F0F0F0' }} // Background color of the tab bar
      indicatorStyle={{ backgroundColor: 'blue' }} // Color of the indicator
      labelStyle={{ color: 'black' }} // Color of the tab labels
    />
  );

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
          <ScrollView>
          <View style={styles.mainInfoContainer}>
            <View style={styles.titleContainer}>
              <Image
                style={styles.logo}
                source={{ uri: nonprofits[0].imageUrl }}
              />
              <View>
                <View style={styles.row}>
                  <Text style={styles.mainTitle}>{nonprofits[0].name} </Text>
                  <Image source={require('../../../assets/buttons/starfordiscover.png')} style={styles.token}/>
                </View>
                  <Text style={styles.followers}>
                    NonProfit • {followNum} Community Members
                  </Text>
              </View>
            </View>

            <View style={[styles.storiesSection, {paddingHorizontal:3}]}>
              <View style={[styles.aboutContent]}>
                <Text style={[styles.aboutContent, { paddingHorizontal: 10 }]}>
                  {nonprofits[0].bio}
                </Text>
                <Text 
                  style={[styles.aboutContent, {paddingLeft: 10, color: "blue"}]}
                  onPress={() => 
                    {
                      let web = nonprofits[0].websiteUrl
                      Linking.openURL(web);
                    }}
                >
                  {nonprofits[0].websiteUrl}
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
            <Pressable
              style={[styles.buttonStyle, { backgroundColor:"#007AFF", flex: 0.85, marginTop: 15 }]}
              onPress={() => {
                navigation.navigate("GiveScreen", { id: id });
              }}
            >
              <View style={styles.row}>
                <Image source={require('../../../assets/buttons/givecoin2.png')} style={styles.token}/>
                <Text style={styles.buttonText}> Give Coins</Text>
              </View>
            </Pressable>
            <Text style={{textAlign:"center", fontSize:12}}>You have 100 Give Coins!</Text>
          </View>

          <View style={styles.progressSection}>
            <Progress.Bar
              progress={amount / nonprofits[0].goals[0]}
              width={350}
              height={15}
              borderRadius={50}
            />
            <View
              style={{
                display:"absolute", 
                left:(350*amount / nonprofits[0].goals[0] - 15),
                marginTop: -23
              }}
            >
            <Image 
              source={require("../../../assets/mariah/mariahProfile.png")}
              style={[styles.token, {backgroundColor:"#007AFF", 
                borderRadius:50,
              }]}
            />
            </View>
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

        <View style={{height:600}}>
          <TabView
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            style={{height:800}}
            renderTabBar={renderTabBar}
            indicatorStyle={{ backgroundColor: 'red' }}
          />
        </View>

        </ScrollView>
        </BottomSheet>
        <View style={{ position: "absolute", top: 50 }}>
          <ProfileHeader 
            page="Stories"
          />
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
    justifyContent: "center",
    paddingVertical: 4,
    color: "black",
    fontSize: 24,
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
    alignSelf:"center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  progressSection: {
    alignSelf: "center",
    padding: 15,
    marginTop: 10
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
    color: "black",
    fontSize: 12,
    textAlign: "left",
  },
  followers: {
    fontWeight: "600",
    fontSize: 12
  },
  token:{
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  row: {
    display: "flex", 
    flexDirection: "row"
  }
});