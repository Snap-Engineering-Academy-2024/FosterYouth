import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChatScreenBanner({setShowBanner}) {
    return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Image source={require('../../assets/snapchat/chatBannerBitmoji.png')} style={styles.image} />

            <View>
              <Text style={styles.mainHeading}>Show your support for Foster Youth</Text>
              <Text style={styles.subHeading}>Use Give Fund and give back to the community</Text>
            </View>

            <TouchableOpacity onPress={() => setShowBanner(false)}>
              <Ionicons name="close" size={25} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        padding: 8,
      },
    
      content : {
        backgroundColor: "lightgrey",
        borderRadius: 10,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15
      },
    
      image : {
        width: 60,
        height: 60,
        backgroundColor: "#10adff",
        borderRadius: 30
      },
    
      mainHeading : {
        fontSize: 16,
      },
    
      subHeading : {
        fontSize: 12,
        color: "#6b6c6d"
      },
});