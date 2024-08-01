import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Pressable, Text } from "react-native";
import defaultProfileImage from "../../assets/snapchat/Snap Icon.png";
import { useNavigation } from "@react-navigation/native";


//Temporary Solution to avoid warning on user screen
const error = console.error; 
console.error = (...args) => { 
  if (/defaultProps/.test(args[0])) return; error(...args); 
};

const CHATBOT_USER_OBJ = {
  _id: 3,
  name: "Team Snapchat",
  avatar: defaultProfileImage,
};

export default function ChatNotification() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Team Snapchat says hi",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    // console.log("User message text:", userMessages[0].text);

    // Simple chatbot logic (aka Checkpoint 2 onwards) here!

    addBotMessage("Try out Give Fund");
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <>
    <Pressable
        onPress={() =>{
          navigation.navigate('CampaignScreen')
        }
        }
        style={styles.buttonStyle}
      >
        <Text>Join Friends to Give Fund</Text>
      </Pressable>
      <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Alexis",
      }}
      renderUsernameOnMessage={true}
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FFFC00',
  },
});