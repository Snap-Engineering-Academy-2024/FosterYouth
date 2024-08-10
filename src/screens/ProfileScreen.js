import { Image, Text, View, Modal, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ScrollView, Animated } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetView, SCREEN_WIDTH } from "@gorhom/bottom-sheet"; // yarn add @gorhom/bottom-sheet
import ProfileHeader from "../components/ProfileHeader";
import { LinearGradient } from 'expo-linear-gradient'; // yarn add expo-linear-gradient

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProfileScreen(){
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useState(new Animated.Value(SCREEN_HEIGHT))[0];

  const handleOpenModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 500, 
      duration: 200,
      useNativeDriver: true,
    }).start(() => {setModalVisible(false);});
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onShow={handleOpenModal}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.modalHeading}>Give Coins!</Text>

            <Image source={require('../../assets/snapchat/Give Coin 2.gif')} style={styles.modalImage}/>
            
            <View style={styles.modalTextContainer}>
              <Image source={require('../../assets/mariah/smileCircle.png')} style={styles.modalImageMariah}/>
              <View>
                <Text style={styles.modalText}>Earn Give Coins by watching sponsored videos from non-profits.</Text>
                <Text style={{fontSize: 10, color: "grey", textAlign: "center", width: 260, marginTop: 5}}>Your views generate Give Coins through ad revenue!</Text>
              </View>
            </View>

            <View style={styles.modalTextContainer}>
              <Image source={require('../../assets/mariah/thumbUp.png')} style={styles.modalImageMariah}/>
              <Text style={styles.modalText}>Donate to the causes you care most about!</Text>
            </View>

            <View style={styles.modalTextContainer}>
              <Image source={require('../../assets/mariah/yayCircle.png')} style={styles.modalImageMariah}/>
              <Text style={styles.modalText}>Support and give back while enjoying content!</Text>
            </View>

            <TouchableOpacity onPress={handleCloseModal} style={styles.modalCloseButton}>
              <Ionicons name="close" size={25} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <ImageBackground source={require("../../assets/snapchat/mariahprofilebackground.png")} style={styles.image}>
        <BottomSheet
          ref={sheetRef}
          index={3}
          snapPoints={["35", "48", "58", "68", "78", "85"]}
        >
          <ScrollView style={styles.profileContainer}>
            <View style={styles.nameContainer}>
              <Image source={require("../../assets/snapchat/mariahSnapcode.png")} style={styles.snapcodeImage}/>
              <View>
                <Text style={styles.name}>Mariah Gives</Text>
                <Text>mariah-gives</Text>
              </View>
            </View>

            <View style={styles.tagsContainer}>
              <View style={[styles.tag, {width: 75}]}>
                <Image source={require("../../assets/snapchat/balloon.png")} style={styles.tagImage}/>
                <Text style={styles.tagText}>Aug 7</Text>
              </View>

              <View style={[styles.tag, {width: 75}]}>
                <Image source={require("../../assets/snapchat/snapscore.png")} style={styles.tagImage}/>
                <Text style={styles.tagText}>6,869</Text>
              </View>

              <View style={[styles.tag, {width: 60}]}>
                <Image source={require("../../assets/snapchat/leo.png")} style={styles.tagImage}/>
                <Text style={styles.tagText}>Leo</Text>
              </View>

              <View style={[styles.tag, {width: 125}]}>
                <Image source={require("../../assets/buttons/philanthropistbage1.png")} style={styles.tagImage}/>
                <Text style={styles.tagText}>Philanthropist</Text>
              </View>
            </View>

            <LinearGradient
              colors={['#B8860B', '#FFD700']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0.5, y: 1.5 }}
              style={styles.gradientBorder}
            >
              <TouchableOpacity style={styles.sectionContainer} onPress={handleOpenModal}>
                <View style={styles.sectionTitleContainer}>
                  <Image source={require("../../assets/buttons/givecoin2.png")} style={styles.sectionImageGiveCoin}/>
                  <View>
                    <Text style={styles.sectionTitle}>Give Coins</Text>
                    <Text style={styles.sectionDescription}>189</Text>
                  </View>
                </View>
                
                <View style={styles.sectionNewContainer}>
                  <Text style={styles.sectionNew}>New Features</Text>
                  <Image source={require("../../assets/snapchat/arrowRight.png")} style={styles.sectionArrow}/>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <Text style={styles.heading}>Communities</Text>

            <TouchableOpacity style={styles.sectionContainer}>
              <View style={styles.sectionTitleContainer}>
                <Image source={require("../../assets/snapchat/communitiesIcon.png")} style={styles.sectionImage}/>
                <View>
                  <Text style={styles.sectionTitle}>Give Fund</Text>
                  <Text style={styles.sectionDescription}>Support a Non-Profit</Text>
                </View>
              </View>
              
              <View style={styles.sectionNewContainer}>
                <Text style={styles.sectionNew}>New</Text>
                <Image source={require("../../assets/snapchat/arrowRight.png")} style={styles.sectionArrow}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sectionContainer}>
              <View style={styles.sectionTitleContainer}>
                <Image source={require("../../assets/snapchat/communitiesIcon.png")} style={styles.sectionImage}/>
                <View>
                  <Text style={styles.sectionTitle}>Add School</Text>
                  <Text style={styles.sectionDescription}>Meet new friends and view your Communit...</Text>
                </View>
              </View>
              
              <View style={styles.sectionNewContainer}>
                <Image source={require("../../assets/snapchat/arrowRight.png")} style={styles.sectionArrow}/>
              </View>
            </TouchableOpacity>

            <Text style={styles.heading}>Friends</Text>

            <TouchableOpacity style={styles.sectionContainer}>
              <View style={styles.sectionTitleContainer}>
                <Image source={require("../../assets/snapchat/addFriend.png")} style={styles.sectionImageFriend}/>
                <View>
                  <Text style={styles.sectionTitle}>Add Friends</Text>
                  <Text style={styles.sectionDescription}>2 friend suggestions!</Text>
                </View>
              </View>
              
              <View style={styles.sectionNewContainer}>
              <Text style={styles.sectionNewCircle}>2</Text>
                <Image source={require("../../assets/snapchat/arrowRight.png")} style={styles.sectionArrow}/>
              </View>
            </TouchableOpacity>

            <Text style={styles.heading}>Spotlight & Snap Map</Text>

            <TouchableOpacity style={styles.sectionContainer}>
              <View style={styles.sectionTitleContainer}>
                <Image source={require("../../assets/snapchat/spotlightIcon.png")} style={styles.sectionImageFriend}/>
                <View>
                  <Text style={[styles.sectionTitle, {marginBottom: -3}]}>Add To Spotlight</Text>
                </View>
              </View>
              
              <View style={styles.sectionNewContainer}>
                <Image source={require("../../assets/snapchat/more.png")} style={{width: 16, height: 16, marginRight: 6}}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sectionMyFriends}>
              <View>
                <Image source={require("../../assets/snapchat/friendsImage.png")} style={{width: 360, height: 93}}/>
              </View>
              
              <View style={styles.sectionLargeContainer}>
                <View style={styles.sectionTitleContainer}>
                  <Image source={require("../../assets/snapchat/addFriend.png")} style={styles.sectionImageFriend}/>
                  <View>
                    <Text style={[styles.sectionTitle, {marginBottom: -3}]}>My Friends</Text>
                  </View>
                </View>
                
                <View style={styles.sectionNewContainer}>
                  <Image source={require("../../assets/snapchat/arrowRight.png")} style={styles.sectionArrow}/>
                </View>
              </View>
              
            </TouchableOpacity>
          </ScrollView>
        </BottomSheet>
        <View style={{ position: "absolute", top: 50 }}>
          <ProfileHeader 
            page="Chat"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: '100%',
    height: 500,
    padding: 20,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    gap: 25
  },

  modalHeading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  modalImage: {
    width: 90,
    height: 90,
    marginVertical: -10
  },

  modalImageMariah: {
    width: 75,
    height: 75,
  },

  modalTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },

  modalText: {
    textAlign: "left",
    width: 260,
  },

  modalCloseButton: {
    position: "absolute",
    top: 25,
    right: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  bottomsheet: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    backgroundColor: "white",
    padding: 25,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
    top: SCREEN_HEIGHT / 3.5,
  },

  profileContainer: {
    paddingHorizontal: 12
  },

  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  snapcodeImage: {
    width: 65,
    height: 65,
  },

  name: {
    fontSize: 18,
  },

  tagsContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 15
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 10,
    border: "solid",
    borderColor: "lightgrey",
    borderWidth: 1
  },

  tagImage: {
    width: 20,
    height: 20,
  },

  tagText: {
    color: "#555555",
  },

  gradientBorder: {
    padding: 0.75,
    borderRadius: 12,
    height: 66.5,
    marginBottom: 15
  },

  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 65,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },

  sectionLargeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 65,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 0,
  },

  sectionMyFriends: {
    backgroundColor: "white",
    paddingTop: 10,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },

  sectionImage: {
    width: 30,
    height: 30
  },

  sectionImageGiveCoin: {
    width: 40,
    height: 40,
    marginLeft: -5,
    marginRight: -5
  },

  sectionImageFriend: {
    width: 25,
    height: 25,
    marginLeft: 5
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 3
  },

  sectionDescription: {
    fontSize: 12
  },

  sectionNewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  sectionNew: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    backgroundColor: "#0FADFF",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    overflow: "hidden"
  },

  sectionNewCircle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    backgroundColor: "#0FADFF",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: "hidden"
  },

  sectionArrow: {
    width: 25,
    height: 25
  },
});

