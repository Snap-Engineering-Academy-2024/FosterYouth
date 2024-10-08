import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

export default function ProcessingScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { id, donation } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("ConfirmationScreen", {id:id, donation:donation});
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  
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
      <Image source={require('../../../assets/mariah/waitForIt.png')} style={styles.bitmoji} />

      <Image source={require('../../../assets/snapchat/loading.gif')} style={styles.spinner} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  bitmoji: {
    marginTop: 70,
    width: 300,
    height: 300
  },

  spinner: {
    marginTop: 50,
    width: 75,
    height: 75,
  },
});
