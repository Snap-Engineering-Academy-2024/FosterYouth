import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView, 
  TextInput,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontHeader } from "../../../assets/themes/font";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderFund from "../../components/GiveFundComponents/HeaderFund";
import ButtonMultiselect, {ButtonLayout} from 'react-native-button-multiselect'; //yarn add react-native-button-multiselect
import { supabase } from "../../utils/hooks/supabase";

export default function GiveScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { id } = route.params; 
  const [nonprofits, setNonprofits] = useState([]);

  useEffect(() => {
    async function fetchNonprofits() {
    try {
        const { data, error } = await supabase.from("nonprofits").select("*").eq("registrationNumber", id); 
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
    { label: 'Custom', value: ' ' },
  ];
  const [selectedButtons, setSelectedButtons] = useState([]);
  const handleButtonSelected = (selectedValues) => {
    setSelectedButtons(selectedValues);
    setDonation(selectedValues)
  };

  //Card Payment Options
  const [paymentId, setPaymentId] = useState();

  //Display Public or Not
  const [publicId, setPublicId] = useState(false);
  function changePublicId(){
    setPublicId(!publicId);
  }

  //UPDATE CURRENT TOTAL DONATIONS ON SUPABASE
  async function updateCurrent() {
    if(paymentId && (publicId !== null) && selectedButtons){
      const { data, error } = await supabase
        .from('nonprofits')
        .update({ "currentAmount": nonprofits[0].currentAmount + parseInt(donation), "hasDonated": true })
        .eq('registrationNumber', id)
        .select();
      
      navigation.navigate("ProcessingScreen", {id:id, donation:donation});
    } else{
      console.log("Error! One or more fields missing:");
    }
      
  }
          
  if (nonprofits.length === 0) {
    return null; // or render a loading spinner
  }

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
                source={{uri: nonprofits[0].imageUrl}}
            />
            <Text style={styles.mainTitle}>You're Supporting</Text>
            <Text style={[styles.mainTitle, styles.nonprofitName]}>{nonprofits[0].name}!</Text>

            <View style={styles.moneyContainer}>
            <ButtonMultiselect
              layout={ButtonLayout.CAROUSEL} // Choose from ButtonLayout enum: CAROUSEL, FULL_WIDTH, GRID
              buttons={buttons}
              selectedButtons={selectedButtons}
              onButtonSelected={handleButtonSelected}
              buttonStyle={{width:"auto"}}
              selectedColors={{
                backgroundColor:"#FFFC01", 
                borderColor:"transparent"
              }}
              unselectedColors={{
                backgroundColor:"#E0E0E0", 
                textColor:"#404040",
                borderColor:"transparent"
              }}
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
              Give Method *
            </Text>

            <GiveMethod
              paymentId={paymentId} 
              setPaymentId={setPaymentId}
            />
            
            <View style={{display:"flex", flexDirection:"row"}}>
              <Text style={[styles.sectionTitles, {flex:1}]}>
                Publicly Display *
              </Text>
              <View style={{marginTop:-10, paddingTop:28}}>
                <Ionicons name="information-circle-outline" color="black" size={20}/>
              </View>
            </View>

            <TouchableOpacity onPress={changePublicId} style={styles.clickableContainer}>
              <View style={styles.clickableTextContainer}>
                <Image source={require('../../../assets/snapchat/bitcrowd.png')} style={styles.clickableImageBitmoji}/>
                <Text style={styles.clickableText}>Display Me Publicly on Give Fund</Text>
              </View>  
              <Ionicons
                style={styles.circleIcon}
                name={publicId ? "checkmark-circle" : "ellipse-outline"}
                size={28}
                color={publicId ? "#3CB2E2" : "lightgrey"}
              />
            </TouchableOpacity>

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
                onPress={()=>{
                  updateCurrent();
                }}
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

function GiveMethod({paymentId, setPaymentId}) {

  let iconSize = 20;

  function changePaymentId(value){
    setPaymentId(value);
  }

  return (
    <>
    <TouchableOpacity onPress={() => {
      changePaymentId("card");
    }} style={styles.clickableContainerMethod}>
      <View style={styles.clickableTextContainer}>
        <Ionicons
          style={styles.circleIcon}
          name={"card-outline"}
          size={iconSize}
        />
        <Text style={styles.clickableText}>Credit or Debit Card</Text>
      </View>  
      <Ionicons
        style={styles.circleIcon}
        name={paymentId==="card" ? "checkmark-circle" : "ellipse-outline"}
        size={28}
        color={paymentId==="card" ? "#3CB2E2" : "lightgrey"}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      changePaymentId("apple");
    }} style={styles.clickableContainerMethod}>
      <View style={styles.clickableTextContainer}>
        <Ionicons
          style={styles.circleIcon}
          name={"logo-apple"}
          size={iconSize}
        />
        <Text style={styles.clickableText}>Apple Pay</Text>
      </View>  
      <Ionicons
        style={styles.circleIcon}
        name={paymentId==="apple" ? "checkmark-circle" : "ellipse-outline"}
        size={28}
        color={paymentId==="apple" ? "#3CB2E2" : "lightgrey"}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      changePaymentId("venmo");
    }} style={styles.clickableContainerMethod}>
      <View style={styles.clickableTextContainer}>
        <Ionicons
          style={styles.circleIcon}
          name={"logo-venmo"}
          size={iconSize}
        />
        <Text style={styles.clickableText}>Venmo</Text>
      </View>  
      <Ionicons
        style={styles.circleIcon}
        name={paymentId==="venmo" ? "checkmark-circle" : "ellipse-outline"}
        size={28}
        color={paymentId==="venmo" ? "#3CB2E2" : "lightgrey"}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      changePaymentId("paypal");
    }} style={styles.clickableContainerMethod}>
      <View style={styles.clickableTextContainer}>
        <Ionicons
          style={styles.circleIcon}
          name={"logo-paypal"}
          size={iconSize}
        />
        <Text style={styles.clickableText}>Paypal</Text>
      </View>  
      <Ionicons
        style={styles.circleIcon}
        name={paymentId==="paypal" ? "checkmark-circle" : "ellipse-outline"}
        size={28}
        color={paymentId==="paypal" ? "#3CB2E2" : "lightgrey"}
      />
    </TouchableOpacity>
    </>
  )
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
  bitmojiContainer:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    backgroundColor: "transparent",
  },
  headerImage:{
    resizeMode: "cover",
    width:700,
    height:100, 
    marginTop:50,
  },
  mainInfoContainer:{
    textAlign: "center",
    justifyContent: "center", 
    marginTop: 50,
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
  },
//CLICKABLE BUTTONS,
  clickableContainerMethod:{
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: -1,
  },

  clickableContainer: {
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  clickableImage: {
    width: 20,
    height: 20
  },

  clickableImageBitmoji: {
    width: 25,
    height: 25,
    marginHorizontal: -3
  },

  clickableTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  clickableText: {
    fontSize: 14,
    fontFamily: fontHeader.fontFamily,
  },
});
