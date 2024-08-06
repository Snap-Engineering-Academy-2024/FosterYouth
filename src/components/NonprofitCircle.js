import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../utils/hooks/supabase";

import Header from "./Header";

export default function NonprofitCircle({id}) {
  const navigation = useNavigation();
  const [nonprofits, setNonprofits] = useState([]);
  useEffect(() => {
    async function fetchNonprofits() {
    try {
        const { data, error } = await supabase.from("nonprofits").select("name, imageUrl, followers").eq("registrationNumber", id); 
        if (error) {
            console.error("Error fetching nonprofits:", error.message);
            return;
        }
        if (data) {
            setNonprofits(data);
            // console.log(data);
        }
    } catch (error) {
        console.error("Error fetching Nonprofits:", error.message);
    }
    }

    fetchNonprofits();
  }, []);

  //Helps with rendering of page?! 
  if (nonprofits.length === 0) {
    return null; // or render a loading spinner
  }

  return (
    <View style={styles.nonprofitContainer}>
      <Pressable //added a presable to give the story interaction
        style={[styles.profile, styles.buttons]}
        onPress={() => {
          navigation.navigate("CampaignScreen", {id:id, originScreen:"NonprofitCircle"});
        }}
      >
        <Image
          style={styles.npImage}
          source={{uri: nonprofits[0].imageUrl}}
        />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{nonprofits[0].name}</Text>
        <Text style={styles.subtitle}>{nonprofits[0].followers} followers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nonprofitContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  npImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  titleContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
    // justifyContent: "center",
    // alignContent: "center",
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
    width:90,
    height: 30,
  },
  subtitle: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
});
