
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, View, Image, Text } from 'react-native';
import { Video } from 'expo-av'; //npx expo install expo-av
import React, {useRef, useState, useEffect} from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function VideoScreen({navigation, route}) {
  const video = useRef(null);
  const [statusVideo, setStatusVideo] = useState({});
  const { videoUrlLink, registrationNumber } = route.params; //Destructure any props that were passed in
  const[videoLink, setVideoLink] = useState(videoUrlLink);

  //Focus Event: to be fired when the HomeScreen is focused.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('Focus');
      //Every time the screen is focused the Video starts playing
      if (video.current) {
        video.current.playAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  //Blur Event: to be fired when the HomeScreen loses focus.
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // console.log('Blur');
      //Every time the screen loses focus the Video is paused
      if (video.current) {
        video.current.pauseAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  function campaignScreen() {
    navigation.navigate("NonprofitScreen", {id:registrationNumber, originScreen:"VideoScreen"});
  }

  function giveScreen() {
    navigation.navigate("GiveScreen", {id:registrationNumber, originScreen:"VideoScreen"});
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={videoLink}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        isMuted={false} //set to false if you want sound
        onPlaybackStatusUpdate={setStatusVideo}
        shouldPlay={true}
        controls={false}
      />
      <View style={[styles.headerBar, styles.row]}>
          <View style={[styles.row]}>
            <Image 
              source={{uri:"https://www.commercialappeal.com/gcdn/presto/2018/09/30/PMCA/01e00455-a937-4900-be8e-50a37c86679f-BBBS_B_Logo_The_Capital.jpg?width=660&height=528&fit=crop&format=pjpg&auto=webp"}}
              style={styles.buttonsImage}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Big Brothers Big Sisters</Text>
              <Text style={styles.headerText}>August 9</Text>
            </View>
          </View>
          <Ionicons name="bookmark" size={35} color="white" />

        </View>
      <View style={styles.overlayContainer}>
        {/* <View style={styles.mainLeftContainer}>
          <View style={styles.row}>
            <Ionicons name="play" size={20} color="white" />
            <Text style={[styles.mainLeft, styles.mainLeftCount]}> 20K</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="star-outline" size={20} color="white" />
            <Text style={[styles.mainLeft, styles.mainLeftTitle]}> Big Brothers Big Sisters 💚</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.mainLeft, styles.mainLeftInfo]}>Just By Watching This Video, Your Supporting Big Brothers Big Sisters! This Video Generates 1 Give Coin Automaticly Sent to Your Give Wallet! </Text>
          </View>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={giveScreen} 
          style={styles.buttons}
        >
          <Image 
            source={require("../../../assets/buttons/givecoin2.png")} 
            style={[styles.buttons, styles.buttonsImage]}
          />
        </Pressable>
        <Pressable
          onPress={giveScreen} 
          style={styles.buttons}
        >
          <Ionicons name="heart" size={35} color="white" />
        </Pressable>
        <Pressable
          onPress={giveScreen} 
          style={styles.buttons}
        >
          <Ionicons name="arrow-redo" size={35} color="white" />
        </Pressable>
        {/* <Pressable
          onPress={giveScreen} 
          style={[styles.buttons, {
            backgroundColor:"rgba(52, 52, 52, 0.5)"}]}
        >
          <Ionicons name="ellipsis-horizontal" size={35} color="white" />
        </Pressable> */}
      </View>
      <StatusBar style="auto" />
      <Pressable onPress={campaignScreen}>
        <Image 
          source={require("../../../assets/story/bottomBar.png")}
          style={styles.bar}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'left',
    // justifyContent: 'left',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  overlayContainer:{
    position:"absolute",
    bottom:90,
    width:"85%"
  },
  headerBar:{
    justifyContent:"space-between",
    width:"100%",
    position:"absolute",
    top:0,
    backgroundColor:"black"
  },
  headerTextContainer:{
  },
  headerText:{
    color:"white"
  },
  mainLeftContainer:{
    backgroundColor:"rgba(52, 52, 52, 0.3)",
  },
  mainLeft:{
    color:"white",
    fontWeight: 600
  },
  mainLeftTitle:{
    fontSize:16,
    fontWeight: 900
  },
  buttonContainer:{
    position:"absolute",
    height:200,
    bottom:80,
    paddingBottom:70,
    justifyContent:"space-between",
    right:0,
    width:"15%",
    // borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 2,
    // outlineStyle: "solid",
  },
  buttons: {
    margin: 10,
    alignItems:"center",
  },
  buttonsImage:{
    width:50,
    height:50,
    resizeMode:"contain"
  },
  buttonText:{
    color:"white",
    textAlign:"center"
  },
  bar: {
    width:"100%", 
    position:"absolute",
    bottom:-120,
    right:0,
    resizeMode:"contain"
  },
  row:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    paddingTop:5,
    paddingRight:10
  }
});