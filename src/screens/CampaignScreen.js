import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import DiscoverFeed from "../components/DiscoverFeed";
import HeaderFund from "../components/HeaderFund";
import { useNavigation } from "@react-navigation/native";

/* Discover FlatList will render a component in the list
 * for each object in the array DATA. This is just an example I took
 * from the FlatList documentation, so feel free to change the contents.
 */

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function CampaignScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { title, photoUrl, id, bio, website, contributors, followers, current, goals } = route.params; //Destructure any props that were passed in

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          // Paddings to handle safe area
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <HeaderFund/>
      <View style={styles.contentContainer}>
        <View style={styles.bitmojiContainer}>
          <Text style={styles.sectionHeader}>Join Friends to Give Fund</Text>
          <Image 
            source={{uri:"https://i.ibb.co/xjCH2yR/Screenshot-2024-08-01-at-11-21-07-PM.png"}}
            style={styles.headerImage}
          />
        </View>

        <View style={styles.mainInfoContainer}>
          <Image 
            style={styles.logo}
            source={{uri: photoUrl,}}
          />
          <Text style={styles.mainTitle}>{title}</Text>
          <Pressable 
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>＋ Follow</Text>
          </Pressable>
          <Pressable 
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>＋ Donate</Text>
          </Pressable>
          <Text>Current Amount Raised: ${current}</Text>
          <Text>{website}</Text>
        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>See How You Can Make An Impact</Text>
          <FlatList
            data={DATA}
            horizontal={false}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: "1%" }} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => <DiscoverFeed title={item.title} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  bitmojiContainer:{
    padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    backgroundColor: "#FFFC00",
  },
  headerImage:{
    position:"absolute",
    resizeMode: "cover",
    width:700,
    height:100, 
    marginTop:50,
  },
  mainInfoContainer:{
    marginTop:80,
    textAlign: "center",
    // alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically if needed
    padding: 12,
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    gap: 4,
  },
  mainTitle:{
    // alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    paddingVertical: 4,
    color: "black",
    fontSize: 25,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  storiesSection: {
    padding: 12,
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
    paddingVertical: 4,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: "white",
  },
  logo: {
    alignSelf:"center",
    resizeMode: 'contain',
    width: 66,
    height: 70,
  },
});
