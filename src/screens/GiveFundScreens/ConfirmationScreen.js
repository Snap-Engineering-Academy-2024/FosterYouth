import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ConfettiCannon from 'react-native-confetti-cannon'; // yarn add react-native-confetti-cannon

export default function ConfirmationScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { title, photoUrl, contributors, current, goals, stories } = route.params; 

  const { width, height } = Dimensions.get('window');
  const confettiRef = useRef(null);

  useEffect(() => {
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

          <Image source={require('../../../assets/snapchat/mariahYus.png')} style={styles.image}/>

          <Text style={styles.subHeading}>You've Earned The Philanthropist Badge</Text>

          <Pressable onPress={() =>{
              navigation.navigate('CampaignScreen', {
                title: title,
                photoUrl: photoUrl,
                contributors: contributors,
                current: current,
                goals: goals,
                stories: stories
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
    marginVertical: 30,
    fontSize: 28,
    fontWeight: "bold",
    width: 300,
    textAlign: "center"
  },

  image: {
    width: 250,
    height: 250
  },

  subHeading: {
    marginVertical: 30,
    fontSize: 18,
    width: 250,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#007aff",
    width: "75%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
