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
  TextInput
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontHeader } from "../../../assets/themes/font";
import { colors } from "../../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderFund from "../../components/HeaderFund";
import { useNavigation } from "@react-navigation/native";
import CampaignTestimonials from "../../components/CampaignTestimonials";

export default function DonateScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { title, photoUrl, contributors, current, goals, stories } = route.params; 

  const [donation, setDonation] = useState("0");
  
  const handleNumberChange = (text) => {
    setDonation(text);
  };

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
        </View>

        <View style={styles.mainInfoContainer}>
          <Image 
              style={styles.logo}
              source={{uri: photoUrl,}}
            />
            <Text style={styles.mainTitle}>You're Supporting</Text>
            <Text style={[styles.mainTitle, styles.nonprofitName]}>{title}!</Text>

            <View style={styles.moneyContainer}>
                <Pressable 
                    style={[styles.buttonStyle, styles.chosenMoneyButton]}
                >
                    <View style={{display:"flex", flexDirection:"row"}}>
                    <Ionicons name="checkmark-outline" color="white" size={20}/>
                    <Text style={styles.buttonText}> $1</Text>
                    </View>
                </Pressable>
                <Pressable 
                    style={[styles.buttonStyle, styles.moneyButton]}
                >
                    <View style={{display:"flex", flexDirection:"row"}}>
                        <Text style={styles.buttonText}> $5</Text>
                    </View>
                </Pressable>
                <Pressable 
                    style={[styles.buttonStyle, styles.moneyButton, {display:"flex", flexDirection:"row"}]}
                >
                    <Text style={styles.inputLabel}>Other: </Text>
                    <TextInput
                        keyboardType="numeric"
                        value={donation}
                        onChangeText={handleNumberChange}
                        style={styles.input}
                    />
                </Pressable>
            </View>

            

            <Pressable 
                style={styles.buttonStyle}
            >
                <View style={{display:"flex", flexDirection:"row"}}>
                <Ionicons name="gift-outline" color="yellow" size={20}/>
                <Text style={styles.buttonText}>  Donate</Text>
                </View>
            </Pressable>
            <Text>Current Amount Raised: ${current}</Text>
        </View>
    </View>
      
    </ScrollView>
        <View style={{backgroundColor:"white",
                position: "absolute",
                left: 0, 
                top: 0,}}>
            <HeaderFund />
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
    fontSize: 30,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  nonprofitName:{
    fontSize: 40,
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
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#007AFF',
    width: 120,
    height: 50
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  chosenMoneyButton:{
    backgroundColor: "black",
  },
  moneyButton:{
    backgroundColor: "#707070",
  },
  moneyContainer:{
    display:"flex", 
    flexDirection:"row", 
    justifyContent: "center",
    alignItems:"center"
  }, 
  inputLabel:{
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
    color: "white"
  },
  input:{
    backgroundColor:"white",
    width: 50, 
    borderRadius: 10,
    padding: 10
  }
});
