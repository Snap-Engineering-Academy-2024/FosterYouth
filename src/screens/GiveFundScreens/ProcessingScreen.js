import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProcessingScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { title, photoUrl, contributors, current, goals, stories } = route.params;
  
  const [loading, setLoading] = useState(true);

  // Simulate loading process
  useEffect(() => {
    // Simulate a loading process with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout as needed

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
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

    <View style={styles.imageContainer}>
        <Image source={require('../../../assets/snapchat/mariahProcessing.png')} style={styles.image} />
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
      <Text style={styles.text}>Processing</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
