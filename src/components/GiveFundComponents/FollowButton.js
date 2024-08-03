import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FollowButton({ followNum,setFollowNum, isFollowing, setIsFollowing }) {
  const insets = useSafeAreaInsets();

  function handleFollow() {
    if (!isFollowing) {
      setFollowNum(followNum + 1);
      setIsFollowing(true);
    } else {
      setFollowNum(followNum - 1);
      setIsFollowing(false);
    }
  }

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
      {isFollowing ? 
      <>
        <Pressable 
          style={[styles.buttonStyle, styles.unfollow]}
          onPress={() => {
            handleFollow()
          }}
        >
          <View style={{display:"flex", flexDirection:"row"}}>
              <Ionicons name="remove-circle-outline" color="red" size={25}/>
              <Text style={[styles.buttonText, styles.unfollow]}> Unfollow</Text> 
          </View>
        </Pressable>
      </>
              : 
      <>
        <Pressable 
          style={[styles.buttonStyle]}
          onPress={() => {
            handleFollow()
          }}
        >
          <View style={{display:"flex", flexDirection:"row"}}>
            <Ionicons name="add-circle-outline" color="yellow" size={25}/>
            <Text style={[styles.buttonText]}> Follow</Text> 
          </View>
        </Pressable>
      </>
      }
            
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black"
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#0FADFF',
  },
  unfollow:{
    backgroundColor: "white",
    color: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
