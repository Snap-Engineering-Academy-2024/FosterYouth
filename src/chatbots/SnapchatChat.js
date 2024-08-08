import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, SafeAreaView, Platform, Pressable, Text, Image } from "react-native";
import defaultProfileImage from "../../assets/snapchat/Snap Icon.png";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../utils/hooks/supabase";

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

export default function SnapchatChat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const [nonprofits, setNonprofits] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Team Snapchat says hi",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);

    async function fetchNonprofits() {
      try {
          const { data, error } = await supabase.from("nonprofits").select("*");
          if (error) {
              console.error("Error fetching nonprofits:", error.message);
              return;
          }
          if (data) {
              setNonprofits(data);
              // console.log(data[0]);
          }
      } catch (error) {
          console.error("Error fetching Nonprofits:", error.message);
      }
      }
  
      fetchNonprofits();
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
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
    addBotMessage("Try out Give Fund!");
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <>
    <Image 
      source={require("../../assets/TeamSnapImage.png")}
      style={{
        resizeMode:"contain", 
        width:400, 
        height:800,
        marginTop:-45
      }}
    />
    {/* <Pressable
        onPress={() =>{
          navigation.navigate('CampaignScreen', {
            title: nonprofits[0].name,
            photoUrl: nonprofits[0].imageUrl,
            id: nonprofits[0].registrationNumber,
            bio: nonprofits[0].bio,
            website: nonprofits[0].websiteUrl,
            contributors: nonprofits[0].contributors,
            followers: nonprofits[0].followers,
            current: nonprofits[0].currentAmount,
            goals: nonprofits[0].goals,
            stories: nonprofits[0].stories
          })
        }
        }
        style={styles.buttonStyle}
      >
        <Text>Join Friends to Give Fund</Text>
      </Pressable> */}
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