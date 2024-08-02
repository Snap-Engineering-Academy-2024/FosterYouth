import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";
import NonprofitCircle from "../components/NonprofitCircle";
import { supabase } from "../utils/hooks/supabase";
import {useState, useEffect} from 'react';

export default function GiveFundSection() {
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
            }
        } catch (error) {
            console.error("Error fetching Nonprofits:", error.message);
        }
        }
    
        fetchNonprofits();
    }, []);

    const renderItem = ({ item }) => ( //Renders individual items for Flatlist for our nonprofit list
        <NonprofitCircle 
            name={item.name}
            photoUrl={item.imageUrl}
        />
      );

    return (
        <View style={styles.storyBar}>
            <Text style={styles.sectionHeader}>Give Fund</Text>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
                {nonprofits.length > 1 ? (
                    <FlatList
                        style={{ marginLeft: 10, marginRight: 10 }}
                        data={nonprofits}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.Username}
                        numColumns={5}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        contentContainerStyle={{ alignItems: "center" }}
                        scrollEnabled={false}
                    />
                ) : (
                <Text>No "usersToAdd" table</Text>
            )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
