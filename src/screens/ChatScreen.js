import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";
import { ChatScreenChatOutline, ChatScreenChatFill } from "../../assets/snapchat/NavigationIcons";
import ChatScreenBanner from "../components/ChatScreenBanner";
import ChatScreenNavigation from "../components/ChatScreenNavigation";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [showBanner, setShowBanner] = useState(true);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  function getChatbots() {
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId, chatImage: CHATBOTS[botId].imageUrl, notif: CHATBOTS[botId].notificationMessage, newNotif: CHATBOTS[botId].hasNotification});
    }
    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  useEffect(() => {
    if (chats.length < 1) {
      getChatbots();
    }
  }, [chats.length]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />

      <ChatScreenNavigation chats={chats}/>

      {showBanner && (
        <ChatScreenBanner setShowBanner={setShowBanner}/>
      )}

      <View>
        {chats?.map((chat) => {
          return (
            <TouchableOpacity
              style={styles.userButton}
              onPress={() => {
                setChats((prevChats) =>
                  prevChats.map((chat) =>
                    chat.newNotif === true
                      ? { ...chat, newNotif: false, notif: "Received • 1m" }
                      : chat
                  )
                );

                navigation.navigate("Conversation", {
                  isChatbot: chat.isChatbot,
                  chatId: chat.chatId,
                });
              }}
              key={chat.chatId}
            >
              <Image
                style={styles.userIcon}
                source={chat.chatImage}
              />

              <Text style={[styles.userName, chat.newNotif ? styles.userNameNotification : styles.userNameOpened]}> {chat.chatId} </Text>

              <Ionicons
                style={styles.userCamera}
                name="camera-outline"
                size={24}
                color="lightgrey"
              />

              <Text style={[styles.userNotif, chat.newNotif ? styles.userNotifNotification : styles.userNotifOpened]}> {chat.notif} </Text>

              <View style={styles.userNotifIcon}>
                {chat.newNotif ? (
                  <ChatScreenChatFill width={16} height={16} />
                ) : (
                  <ChatScreenChatOutline width={16} height={16} />
                )}
              </View>
              
              <Ionicons
                style={styles.userCamera}
                name="camera-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  userButton: {
    display: "flex",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingVertical: 35
  },

  userIcon: {
    position: "absolute",
    left: 5,
    top: 15,
    width: 40,
    height: 40,
  },

  userName: {
    position: "absolute",
    left: 50,
    top: 15,
    fontSize: 18,
  },

  userNameNotification: {
    fontWeight: 'bold',
  },

  userNameOpened: {
    fontWeight: 'normal',
  },

  userNotif: {
    position: "absolute",
    left: 70,
    top: 40,
    fontSize: 12,
  },

  userNotifNotification: {
    color: "#0eadff",
    fontWeight: 'bold',
  },

  userNotifOpened: {
    fontWeight: 'normal',
  },


  userNotifIcon: {
    position: "absolute",
    left: 52,
    top: 40,
  },
  userCamera: {
    position: "absolute",
    right: 15,
    top: 23,
  },
});