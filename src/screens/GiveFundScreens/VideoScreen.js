
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { Video } from 'expo-av'; //npx expo install expo-av
import React, {useRef, useState, useEffect} from 'react';

export default function VideoScreen({navigation}) {
  const video = useRef(null);
  const [statusVideo, setStatusVideo] = useState({});

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

  function giveScreen() {
    navigation.navigate("NonprofitScreen", {id:451632968, originScreen:"VideoScreen"});
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require("../../../assets/story/bbbsStoryMovie.mp4")}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        isMuted={false} //set to false if you want sound
        onPlaybackStatusUpdate={setStatusVideo}
        shouldPlay={true}
      />
      <View style={styles.buttons}>
        <Button title="Give Fund" onPress={giveScreen}/>
        {/* <Button title="Play from 20s" onPress={() => video.current.playFromPositionAsync(20000)} />
        <Button title={statusVideo.isLooping ? "Set to not loop" : "Set to loop"} onPress={() => video.current.setIsLoopingAsync(!statusVideo.isLooping)} /> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch'
  },
  buttons: {
    margin: 16
  }
});