import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import BasicChatbot from "../chatbots/BasicChatbot";
import ChatNotification from "../chatbots/ChatNotification";
// prettier-ignore
export const CHATBOTS = {
  "Team Snapchat": {
    name: "Team Snapchat",
    imageUrl: "https://loremflickr.com/140/140",
    component: ChatNotification,
  },
  "BasicChatbot": {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  }
}
export default function ConversationScreen({ route, navigation }) {
  const { isChatbot, chatId } = route.params;
  const insets = useSafeAreaInsets();
  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Pressable
        onPress={() =>{
          navigation.navigate('CampaignScreen')
        }
        }
        style={styles.buttonStyle}
      >
        <Text>CLICK ME</Text>
      </Pressable>
      {isChatbot ? makeChatbotComponent(chatId) : <UserChat chatId={chatId} />}
    </View>
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
    backgroundColor: '#2196F3',
  },
});