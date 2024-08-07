import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Modal, Animated, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";
import { ChatScreenChatOutline, ChatScreenChatFill } from "../../assets/snapchat/NavigationIcons";
import ChatScreenBanner from "../components/ChatScreenBanner";
import ChatScreenNavigation from "../components/ChatScreenNavigation";
import { supabase } from "../utils/hooks/supabase";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [nonprofits, setNonprofits] = useState([]);
  const [showBanner, setShowBanner] = useState(true);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [bannerClicked, setBannerClicked] = useState(false);

  const slideAnim = useState(new Animated.Value(500))[0];

  const handleOpenModal = () => {
    setBannerClicked(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 500, 
      duration: 200,
      useNativeDriver: true,
    }).start(() => setBannerClicked(false));
  };

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

  useEffect(() => {
      async function fetchNonprofits() {
      try {
          const { data, error } = await supabase.from("nonprofits").select("*");
          if (error) {
              console.error("Error fetching nonprofits:", error.message);
              return;
          }
          if (data) {
              setNonprofits(data);
          }
      } catch (error) {
          console.error("Error fetching Nonprofits:", error.message);
      }
      }
  
      fetchNonprofits();
  }, []);

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
        <ChatScreenBanner setShowBanner={setShowBanner} handleOpenModal={handleOpenModal}/>
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

      <View style={styles.newMessageButton}>
        <Ionicons name="add" size={35} color="white"/>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={bannerClicked}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.modalHeading}>Introducing Give Fund.</Text>
            <Image source={require('../../assets/mariah/yus.png')} style={styles.modalImage}/>
            <Text style={styles.modalText}>Watch videos to generate ad revenue, share links, or personally support campaigns here on Snap’s Give Fund page to benefit Kids In The Spotlight, today!</Text>
            <Text style={styles.modalText}>Explore the campaign by {nonprofits[0]?.name} and see how you can get involved!</Text>

            <Pressable onPress={() =>{
              navigation.navigate('NonprofitScreen', {
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

              handleCloseModal();
              setShowBanner(false);

            }} style={styles.modalButton}>
              <Ionicons name="open" size={20} color="white"/>
              <Text style={styles.modalButtonText}>Explore the Campaign</Text>
            </Pressable>

            <TouchableOpacity onPress={handleCloseModal} style={styles.modalCloseButton}>
              <Ionicons name="close" size={25} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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

  newMessageButton : {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#0eadff",
    padding: 14,
    borderRadius: 40,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  modalContent: {
    width: '100%',
    height: 500,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    gap: 25
  },
  
  modalHeading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold"
  },

  modalImage: {
    width: 150,
    height: 150
  },

  modalText: {
    paddingHorizontal: 20,
    textAlign: "center",
  },

  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    gap: 10,
    backgroundColor: "#10adff",
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalCloseButton: {
    position: "absolute",
    top: 25,
    right: 20
  }
});