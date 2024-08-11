import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import SnapchatChat from "../chatbots/SnapchatChat";
import EvanChat from "../chatbots/EvanChat";
import LindseyChat from "../chatbots/LindseyChat";
import EvaLoveChat from "../chatbots/EvaLoveChat";
import CindyChat from "../chatbots/CindyChat";
import JimmyChat from "../chatbots/JimmyChat";
import KyleChat from "../chatbots/KyleChat";
import AbbeyChat from "../chatbots/AbbeyChat";
import MarcusChat from "../chatbots/MarcusChat";
import MarcosChat from "../chatbots/MarcosChat";

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
  },
  "Eva Love": {
    name: "Eva Love",
    imageUrl: require("../../assets/snapchat/evaloveBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 3h • 23🔥",
    component: EvaLoveChat,
  },
  "Cindy Andrade": {
    name: "Cindy Andrade",
    imageUrl: require("../../assets/snapchat/cindyBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 5h • 42🔥",
    component: CindyChat,
  },
  "Jimmy Bryant": {
    name: "Jimmy Bryant",
    imageUrl: require("../../assets/snapchat/jimmyBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 7h • 18🔥",
    component: JimmyChat,
  },
  "Kyle Jussab": {
    name: "Kyle Jussab",
    imageUrl: require("../../assets/snapchat/kyleBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 11h",
    component: KyleChat,
  },
  "Abigail Wynkoop": {
    name: "Abigail Wynkoop",
    imageUrl: require("../../assets/snapchat/abbeyBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 12h • 63🔥",
    component: AbbeyChat,
  },
  "Marcus Gates": {
    name: "Marcus Gates",
    imageUrl: require("../../assets/snapchat/marcusBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 12h • 102🔥",
    component: MarcusChat,
  },
  "Marcos Banuelos": {
    name: "Marcos Banuelos",
    imageUrl: require("../../assets/snapchat/marcosBitmoji.png"),
    hasNotification: false,
    notificationMessage: "Recieved • 13h • 589🔥",
    component: MarcosChat,
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