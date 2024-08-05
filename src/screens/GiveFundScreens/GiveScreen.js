import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView, 
  TextInput
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontHeader } from "../../../assets/themes/font";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderFund from "../../components/GiveFundComponents/HeaderFund";
import ButtonMultiselect, {ButtonLayout} from 'react-native-button-multiselect'; //yarn add react-native-button-multiselect
import RadioGroup from 'react-native-radio-buttons-group'; //yarn add react-native-radio-buttons-group

export default function GiveScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { title, photoUrl, contributors, current, goals, stories } = route.params; 

  const [donation, setDonation] = useState("");
  
  const handleNumberChange = (text) => {
    setDonation(text);
  };

  // Money Donation Buttons
  const buttons = [
    { label: '$1', value: '1' },
    { label: '$5', value: '5' },
    { label: '$10', value: '10' },
    { label: '$20', value: '20' },
    { label: 'Other', value: ' ' },
  ];
  const [selectedButtons, setSelectedButtons] = useState([]);
  const handleButtonSelected = (selectedValues) => {
    setSelectedButtons(selectedValues);
    setDonation(selectedValues)
  };

  //Card Payment Options
  const [selectedId, setSelectedId] = useState();
  const radioButtons = useMemo(() => ([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'Credit or Debit Card  💳',
      value: 'card',
      containerStyle: styles.radioButtonContainer,
      labelStyle: styles.radioButtonLabel,
    },
    {
      id: '1',
      label: 'Apple Pay   🍏',
      value: 'apple',
      containerStyle: styles.radioButtonContainer,
      labelStyle: styles.radioButtonLabel,
    },
    {
      id: '2',
      label: 'Venmo     V',
      value: 'venmo',
      containerStyle: styles.radioButtonContainer,
      labelStyle: styles.radioButtonLabel,
    },
    {
      id: '3',
      label: 'Paypal    P',
      value: 'paypal',
      containerStyle: styles.radioButtonContainer,
      labelStyle: styles.radioButtonLabel,
    },
    {
      id: '4',
      label: 'Snap View Coin    🪙',
      value: 'snap',
      containerStyle: styles.radioButtonContainer,
      labelStyle: styles.radioButtonLabel,
    }
  ]), []);

    //Display Public or Not
    const [publicId, setPublicId] = useState();
    const publicButtons = useMemo(() => ([
      {
        id: '1',
        label: 'Display Me on Give Fund',
        value: 'sure',
        containerStyle: styles.radioButtonContainer,
        labelStyle: styles.radioButtonLabel,
      },
      {
        id: '2',
        label: 'Don\'t Display Me Publicly on Give Fund',
        value: 'dont',
        containerStyle: styles.radioButtonContainer,
        labelStyle: styles.radioButtonLabel,
      },
    ]), []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          // Paddings to handle safe area
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
    <ScrollView>

    <View style={styles.contentContainer}>
        <View style={styles.mainInfoContainer}>
            <Image 
                style={styles.logo}
                source={{uri: photoUrl}}
            />
            <Text style={styles.mainTitle}>You're Supporting</Text>
            <Text style={[styles.mainTitle, styles.nonprofitName]}>{title}!</Text>

            <View style={styles.moneyContainer}>
            <ButtonMultiselect
              layout={ButtonLayout.CAROUSEL} // Choose from ButtonLayout enum: CAROUSEL, FULL_WIDTH, GRID
              buttons={buttons}
              selectedButtons={selectedButtons}
              onButtonSelected={handleButtonSelected}
            />
            </View>

            {selectedButtons==" " ? 
            <>
            <Text style={[{alignSelf:"center", width:"100%"}]}>
              Custom
            </Text>
            <TextInput
              keyboardType="numeric"
              value={donation}
              onChangeText={handleNumberChange}
              placeholder="$0.00"
              style={[styles.input, {alignSelf:"center", width:"100%"}]}
            />
            </>
            :
            <></>
            }

            <Text style={[styles.sectionTitles]}>
              Give Method
            </Text>

            <View style={{borderRadius:10, flex: 1, justifyContent: 'center', backgroundColor:"white"}}>
              <RadioGroup 
                radioButtons={radioButtons} 
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={styles.radioGroup}
              />
            </View>

            <Text style={[styles.sectionTitles]}>
              Publicly Display  ⍰
            </Text>

            <View style={{borderRadius:10, flex: 1, justifyContent: 'center', backgroundColor:"white", marginBottom:30}}>
              <RadioGroup 
                radioButtons={publicButtons} 
                onPress={setPublicId}
                selectedId={publicId}
                containerStyle={styles.radioGroup}
              />
            </View>

            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
              <Text style={[{fontSize:20}]}>
                Your Donation
              </Text>
              <Text style={[{fontSize:20}]}>
                ${donation}
              </Text>
            </View>
            
            <Text style={[styles.sectionTitles]}>
              Confirmation
            </Text>
            <Pressable 
                style={[styles.buttonStyle, styles.donateButton]}
            >
                <View style={{display:"flex", flexDirection:"row"}}>
                    <Ionicons name="gift-outline" color="yellow" size={25}/>
                    <Text style={[styles.buttonText, {fontWeight:"600", fontSize:20}]}>  
                      Complete Give
                    </Text>
                </View>
            </Pressable>
        </View>
    </View>
      
    </ScrollView>
        <View style={{backgroundColor:"white",
                position: "absolute",
                left: 0, 
                top: 0,}}>
            <HeaderFund />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",

  },
  mainInfoContainer:{
    marginTop:50,
    textAlign: "center",
    justifyContent: "center", 
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mainTitle:{
    justifyContent: 'center',
    textAlign: "center",
    paddingVertical: 4,
    color: "black",
    fontSize: 30,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  sectionTitles:{
    width:"100%", 
    marginTop:20,
    fontWeight:"600"
  },
  nonprofitName:{
    fontSize: 40,
  },
  logo: {
    alignSelf:"center",
    resizeMode: "cover",
    width: 66,
    height: 70,
    marginRight: 10,
    borderRadius:100,
    borderColor: "#A05DCD", 
    borderWidth: 3
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#007AFF',
    width: 120,
    height: 50
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  chosenMoneyButton:{
    backgroundColor: "black",
  },
  moneyButton:{
    backgroundColor: "#707070",
  },
  moneyContainer:{
    display:"flex", 
    flexDirection:"row", 
    justifyContent: "center",
    alignItems:"center"
  }, 
  inputLabel:{
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
    color: "white"
  },
  input:{
    backgroundColor:"white",
    width: 90, 
    borderRadius: 10,
    padding: 10
  },
  radioGroup: {
    padding:0
  },
  radioButtonContainer: {
    alignItems: 'flex-start',
    width: '100%',
    borderColor: "#D0D0D0",
    borderWidth:1,
    padding:5, 
    alignItems: 'center',
    marginVertical:0,//Might need to be adjusted based on paddings
    borderRadius:5
  },
  radioButtonLabel:{
    textAlign:"left"
  },
  donateButton: {
    width: "100%",
  }
});
