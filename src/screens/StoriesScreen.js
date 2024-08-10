import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import StoriesBitmoji from "../components/StoriesBitmoji";
import DiscoverFeed from "../components/DiscoverFeed";
import discoverList from '../../assets/discoverList';
import Header from "../components/Header";

const stories = [
  { image: require("../../assets/snapchat/jimmyBitmoji.png"), name: "Jimmy", username: "yimmyauto" },
  { image: require("../../assets/snapchat/marcosBitmoji.png"), name: "Marcos", username: "directedby" },
  { image: require("../../assets/snapchat/evaloveBitmoji.png"), name: "Eva Love", username: "aye_itseva" },
  { image: require("../../assets/snapchat/abbeyBitmoji.png"), name: "Abigail", username: "abbeeyyyy" },
  { image: require("../../assets/snapchat/marcusBitmoji.png"), name: "Marcus", username: "luminalmarc" },
  { image: require("../../assets/snapchat/kyleBitmoji.png"), name: "Kyle", username: "kylejussab" },
  { image: require("../../assets/snapchat/cindyBitmoji.png"), name: "Cindy", username: "cindya_who" }
];

export default function StoriesScreen({ route, navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const renderStories = () => (
    <View style={styles.storyBar}>
      <Text style={[styles.sectionHeader, {marginTop: -10, marginBottom: -5}]}>Friends</Text>
      <FlatList
        data={stories}
        renderItem={({ item }) => <StoriesBitmoji image={item.image} name={item.name} username={item.username}/>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 0 }} // Adjust padding as needed
      />
    </View>
  );

  const renderDiscover = () => (
    <FlatList
      data={discoverList}
      style={{marginLeft: 12}}
      renderItem={({ item }) => (
        <DiscoverFeed
          photoLink={item.link}
          title={item.title}
          type={item.type}
          subtitle={item.subtitle}
        />
      )}
      keyExtractor={(item) => item.link}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingBottom: 0 }}
    />
  );

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
      <Header title="Stories" />
      <FlatList
        ListHeaderComponent={() => (
          <>
            {renderStories()}
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeader}>Following</Text>
              <Image source={require("../../assets/snapchat/arrowRight.png")} style={{ width: 15, height: 15 }} />
            </View>

            <Image style={styles.followingCard} source={require("../../assets/snapchat/mariahBitmojiStory.png")}/>

            <Text style={[styles.sectionHeader, styles.sectionHeaderContainer]}>Discover</Text>
          </>
        )}
        ListFooterComponent={renderDiscover}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  storyBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  sectionHeader: {
    textAlign: "left",
    paddingVertical: 1,
    color: colors.primary,
    fontSize: 14,
    marginLeft: 12,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  followingCard: {
    width: 90,
    height: 140,
    backgroundColor: "red",
    marginLeft: 12,
    borderRadius: 7,
    marginVertical: 4
  },
});
