import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import SnapchatChat from "../chatbots/SnapchatChat";
import EvanChat from "../chatbots/EvanChat";
import LindseyChat from "../chatbots/LindseyChat";

// prettier-ignore
export const CHATBOTS = {
  "Team Snapchat": {
    name: "Team Snapchat",
    imageUrl: require("../../assets/snapchat/Snap Icon.png"),
    hasNotification: true,
    notificationMessage: "New Chat • 1m",
    component: SnapchatChat,
  },
  "Evan Spiegel": {
    name: "Evan Spiegel",
    imageUrl: require("../../assets/snapchat/personalBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 2h • 52🔥",
    component: EvanChat,
  },
  "Lindsey Heisser": {
    name: "Lindsey Heisser",
    imageUrl: require("../../assets/snapchat/lindseyBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 3h • 78🔥",
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