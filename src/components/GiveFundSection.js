import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import StoriesBitmoji from "../components/StoriesBitmoji";
import { supabase } from "../utils/hooks/supabase";
import {useState, useEffect} from 'react';

export default function GiveFundSection() {
    console.log("Hi");
    const [nonprofits, setNonprofits] = useState([]);

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
                console.log("~~~~~~~~~~~~~~~~~~~~~~DATA~~~~~~~~~~~~~~~~~~~~~~", data);
                console.log("FIRST ITEM~~~~~~~~~~~~~~~~~~~~~~", data[0].bio);
            }
        } catch (error) {
            console.error("Error fetching Nonprofits:", error.message);
        }
        }
    
        fetchNonprofits();
    }, []);


    return (
        <View style={styles.storyBar}>
            <Text style={styles.sectionHeader}>Give Fund</Text>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stories}
            >
                <StoriesBitmoji />
                <StoriesBitmoji />
                <StoriesBitmoji />
                <StoriesBitmoji />
                <StoriesBitmoji />
                <StoriesBitmoji />
                <StoriesBitmoji />
            </ScrollView>
            <Text>{nonprofits[1].name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  myBitmoji: {
    alignItems: "center",
    justifyContent: "center",
  },
  bitmojiImage: {
    width: 60,
    height: 60,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.5,
  },
  Friends: {
    textAlign: "left",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  storyBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  sectionHeader: {
    textAlign: "left",
    paddingVertical: 4,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
});
