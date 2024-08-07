import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../utils/hooks/supabase";
import Ionicons from "react-native-vector-icons/Ionicons";

import ConfettiCannon from 'react-native-confetti-cannon'; // yarn add react-native-confetti-cannon

export default function ConfirmationScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { id, donation } = route.params; 
  const [title, setTitle] = useState("");

  const { width, height } = Dimensions.get('window');
  const confettiRef = useRef(null);

  const [emailSelected, setEmailSelected] = useState(false);
  const [bitmojiSelected, setBitmojiSelected] = useState(false);
  const [badgeSelected, setBadgeSelected] = useState(false);

  function changeSelectionEmail(){
    setEmailSelected(!emailSelected);
  }

  function changeSelectionBitmoji(){
    setBitmojiSelected(!bitmojiSelected);
  }

  function changeSelectionBadge(){
    setBadgeSelected(!badgeSelected);
  }

  useEffect(() => {
    async function fetchNonprofits() {
      try {
          const { data, error } = await supabase.from("nonprofits").select("name").eq("registrationNumber", id); 
          if (error) {
              console.error("Error fetching nonprofits:", error.message);
              return;
          }
          if (data) {
              setTitle(data[0].name);
              // console.log(data);
          }
      } catch (error) {
          console.error("Error fetching Nonprofits:", error.message);
      }
      }
  
      fetchNonprofits();
    if (confettiRef.current) {
      confettiRef.current.start();
    }
  }, []);

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
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: height / 2 }} 
        fallSpeed={1000}
        blastDirection={-1}
        fadeOut={true} 
      />

      <ScrollView>
        <View style={styles.confirmationContainer}>
          <Text style={styles.mainHeading}>Your Donation to {title} is Complete!</Text>

          <Image source={require('../../../assets/mariah/yus.png')} style={styles.image}/>

          <Text style={styles.subHeading}>You've Earned The Philanthropist Badge</Text>

          <TouchableOpacity onPress={changeSelectionEmail} style={styles.clickableContainer}>
            <View style={styles.clickableTextContainer}>
              <Image source={require('../../../assets/snapchat/tax.png')} style={styles.clickableImage}/>
              <Text style={styles.clickableText}>Send Deduction To Email On File</Text>
            </View>
            
            <Ionicons
              style={styles.circleIcon}
              name={emailSelected ? "checkmark-circle" : "ellipse-outline"}
              size={28}
              color={emailSelected ? "#3CB2E2" : "lightgrey"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeSelectionBitmoji} style={styles.clickableContainer}>
            <View style={styles.clickableTextContainer}>
              <Image source={require('../../../assets/mariah/smileCircle.png')} style={styles.clickableImageBitmoji}/>
              <Text style={styles.clickableText}>Add My Bitmoji to Philanthropist Crowd</Text>
            </View>
            
            <Ionicons
              style={styles.circleIcon}
              name={bitmojiSelected ? "checkmark-circle" : "ellipse-outline"}
              size={28}
              color={bitmojiSelected ? "#3CB2E2" : "lightgrey"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeSelectionBadge} style={styles.clickableContainer}>
            <View style={styles.clickableTextContainer}>
              <Image source={require('../../../assets/mariah/thumbUp.png')} style={styles.clickableImageBitmoji}/>
              <Text style={styles.clickableText}>Display Philanthropist Badge On Profile</Text>
            </View>
            
            <Ionicons
              style={styles.circleIcon}
              name={badgeSelected ? "checkmark-circle" : "ellipse-outline"}
              size={28}
              color={badgeSelected ? "#3CB2E2" : "lightgrey"}
            />
          </TouchableOpacity>
          
          <View style={styles.donationTextContainer}>
            <Text style={styles.donationText}>Your Donation</Text>
            <Text style={styles.donationText}>${donation}</Text>
          </View>
          
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Share Now</Text>
          </Pressable>

          <Pressable onPress={() =>{
              navigation.navigate('NonprofitScreen', {
                id: id,
                originScreen: "ConfirmationScreen"
              })}} style={styles.button}>
            <Text style={styles.buttonText}>Back to Campaign</Text>
          </Pressable>
        </View>
        
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  confirmationContainer: {
    flex: 1,
    alignItems: "center",
  },

  mainHeading: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    width: 300,
    textAlign: "center"
  },

  image: {
    width: 220,
    height: 220
  },

  subHeading: {
    marginVertical: 20,
    fontSize: 18,
    width: 250,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#007aff",
    width: "90%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },

  clickableContainer: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "90%",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  clickableImage: {
    width: 20,
    height: 20
  },

  clickableImageBitmoji: {
    width: 25,
    height: 25,
    marginHorizontal: -3
  },

  clickableTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  clickableText: {
    fontSize: 12
  },

  donationTextContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginBottom: 40
  },

  donationText: {
    fontSize: 16
  },
});
