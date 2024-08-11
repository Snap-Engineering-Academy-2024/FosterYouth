import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import defaultProfileImage from "../../assets/snapchat/kyleBitmoji.png";

//Temporary Solution to avoid warning on user screen
const error = console.error; 
console.error = (...args) => { 
  if (/defaultProps/.test(args[0])) return; error(...args); 
};

const CHATBOT_USER_OBJ = {
  _id: 8,
  name: "Kyle Jussab",
  avatar: defaultProfileImage,
};

export default function KyleChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "You know a ducks quack doesn't echo... I don't know how to feel about that.",
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
    addBotMessage("What's a Give Fund?");
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
