import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import ChatNotification from "../chatbots/ChatNotification";
import EvanChat from "../chatbots/EvanChat";
import LindseyChat from "../chatbots/LindseyChat";

// prettier-ignore
export const CHATBOTS = {
  "Team Snapchat": {
    name: "Team Snapchat",
    imageUrl: require("../../assets/snapchat/Snap Icon.png"),
    component: ChatNotification,
  },
  "Evan Spiegel": {
    name: "Evan Spiegel",
    imageUrl: require("../../assets/snapchat/personalBitmoji.png"),
    component: EvanChat,
  },
  "Lindsey Heisser": {
    name: "Lindsey Heisser",
    imageUrl: require("../../assets/snapchat/lindseyBitmoji.png"),
    component: LindseyChat,
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
});