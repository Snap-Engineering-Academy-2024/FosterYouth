import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView, 
  Linking
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderFund from "../components/GiveFundComponents/HeaderFund";
import { useNavigation } from "@react-navigation/native";
import CampaignTestimonials from "../components/GiveFundComponents/CampaignTestimonials";
import FollowButton from "../components/GiveFundComponents/FollowButton";
import * as Progress from 'react-native-progress'; //yarn add react-native-progress --save

export default function CampaignScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { title, photoUrl, id, bio, website, contributors, followers, current, goals, stories } = route.params; //Destructure any props that were passed in
  const[followNum, setFollowNum] = useState(followers);
  const[isFollowing, setIsFollowing] = useState(false);

  const [amount, setAmount] = useState(current);

  ///SUPABASE CALL
  //SELECT * where ID is ___

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
    <ScrollView>

      <View style={styles.contentContainer}>
        <View style={styles.bitmojiContainer}>
          <Image 
            source={{uri:"https://i.ibb.co/xjCH2yR/Screenshot-2024-08-01-at-11-21-07-PM.png"}}
            style={styles.headerImage}
          />
          <Text style={[styles.sectionHeader, {marginTop:-40, fontSize:16, backgroundColor:"#FFFC01"}]}>Join Friends to Give Fund</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <View style={styles.titleContainer}>
            <Image 
              style={styles.logo}
              source={{uri: photoUrl,}}
            />
            <View>
              <Text style={styles.mainTitle}>{title}</Text>
              <Text style={styles.followers}>{followNum} followers</Text>
            </View>
          </View>
          
          <FollowButton 
              followNum={followNum}
              setFollowNum={setFollowNum}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
            />

            <Pressable 
              style={[styles.buttonStyle, 
                {flex: 1}]}
              onPress={() => {
                navigation.navigate("GiveScreen", {title:title, photoUrl:photoUrl, contributors:contributors, current:amount, goals:goals, stories:stories, setAmount:setAmount});
              }}
            >
              <View style={{display:"flex", flexDirection:"row"}}>
                <Ionicons name="gift-outline" color="black" size={20} />
                <Text style={styles.buttonText}>  Give</Text>
              </View>
            </Pressable>
          </View>

          {/* can make this section a component to work on Bitmoji head */}
          <View style={styles.progressSection}>
            <Progress.Bar 
              progress={current/goals[0]} 
              width={200} 
              height={15}
              borderRadius={50}
            />
            <Text style={[{color: colors.primary,fontSize: fontHeader.fontSize, fontFamily: fontHeader.fontFamily,textAlign:"center", paddingVertical:10, fontSize:15}]}>
              ${amount} raised out of ${goals[0]} goal
            </Text>
          </View>

        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>Testimonials</Text>
          <Text style={[styles.sectionHeader, {fontSize:14, fontWeight:"400"}]}>Watch a story to support {title}!</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.sectionContent}
          >
            {stories.length > 0 ? (
                <FlatList
                  data={stories}
                  horizontal={false}
                  numColumns={stories.length}
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
          <Text style={styles.sectionHeader}>About</Text>
          <Pressable onPress={() => Linking.openURL(website)}>
            <View style={[styles.sectionContent, {justifyContent:"space-between"}]}>
              <Text style={{padding:10}}>{title} Website</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="black" style={{padding:10}}/>
            </View>
          </Pressable>
        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>Friends</Text>
          <View style={[styles.sectionContent, {justifyContent:"space-between"}]}>
            <Text style={{padding:10}}>Invite Friends</Text>
            <Ionicons name="people-outline" size={20} color="black" style={{padding:10}}/>
          </View>
        </View>

        <View style={styles.storiesSection}>
          <Text style={styles.sectionHeader}>My Stories</Text>
          <View style={[styles.sectionContent,{justifyContent:"space-between"}]}>
            <Text style={{padding:10}}>Add to my story</Text>
            <Ionicons name="camera-outline" size={20} color="black" style={{padding:10}}/>
          </View>
        </View>
      
    </ScrollView>
    <View style={{backgroundColor:"white",
      position: "absolute",
      left: 0, 
      top: 0,}}>
      <HeaderFund />
      {/* <Image source={{uri: "../../assets/buttons/campaignHeader.png"}} style={{width:50, height: 50}}/> */}
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
  titleContainer: {
    display: "flex",
    flexDirection: "row",

  },
  bitmojiContainer:{
    // padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    backgroundColor: "transparent",
  },
  headerImage:{
    // position:"absolute",
    resizeMode: "cover",
    width:700,
    height:100, 
    marginTop:50,
  },
  mainInfoContainer:{
    textAlign: "center",
    // alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically if needed
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "column",
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
  logo: {
    alignSelf:"center",
    resizeMode: "cover",
    width: 66,
    height: 70,
    marginRight: 10,
    borderRadius:100,
    borderColor: "#A05DCD", 
    borderWidth: 3
  },
  storiesSection: {
    paddingHorizontal: 12,
    paddingVertical:5,
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
    display:"flex",
    flexDirection: "row",
    backgroundColor:"white", 
    padding: 10,
    borderRadius: 12, 
    shadowColor: "#E8E8E8", 
    shadowOffset: {width: -5, height: 4},
    shadowRadius: 25,
  },
  buttonStyle: {
    alignItems: 'center',
    // alignSelf:"center",
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FFFC01',
    // width:"80%"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  progressSection:{
    alignSelf:"center",
    padding: 15,
  },
});
