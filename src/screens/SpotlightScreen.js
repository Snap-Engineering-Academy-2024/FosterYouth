import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import discoverList from "../../assets/discoverList";

const renderItem = ({ item }) => {
  return (
    <Image style={styles.image} source={{ uri: item.link }} />
  )
};

export default function SpotlightScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      pagingEnabled={true}
      data={discoverList}
      keyExtractor={(item) => item.link}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    padding: 20,
  },
  image: {
    height: 800,
  },
});
