import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import defaultProfileImage from "../../assets/snapchat/evaloveBitmoji.png";

//Temporary Solution to avoid warning on user screen
const error = console.error; 
console.error = (...args) => { 
  if (/defaultProps/.test(args[0])) return; error(...args); 
};

const CHATBOT_USER_OBJ = {
  _id: 5,
  name: "Eva Love",
  avatar: defaultProfileImage,
};

export default function EvaLoveChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Did you know that 80.3% feel very to extremely passionate about supporting social causes and 58.2% are unable to provide financial support? Crazy right?",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
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
    addBotMessage("Mariah there's this new Give Fund option, go check it out.");
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
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
  );
}
