import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import AgeScreen from "~screens/onBoarding/AgeScreen";
import AllreadyVerifiedScreen from "~screens/public/AllreadyVerifiedScreen";
import CountryScreen from "~screens/onBoarding/CountryScreen";
import DescribesScreen from "~screens/onBoarding/DescribesScreen";
import EmailLoginScreen from "~screens/public/EmailLoginScreen";
import FirstNameScreen from "~screens/onBoarding/FirstNameScreen";
import HomeScreen from "~screens/onBoarding/HomeScreen";
import ForgotPasswordScreen from "~screens/public/ForgotPasswordScreen";
import CreateProfileScreen from "~screens/onBoarding/CreateProfileScreen";
import ReSendEmailScreen from "~screens/public/ReSendEmailScreen";
import WelcomeScreen from "~screens/public/WelcomeScreen";
import AdventurousScreen from "~screens/onBoarding/AdventurousScreen";
import AdventureScreen from "~screens/onBoarding/AdventureScreen";
import WishesScreen from "~screens/onBoarding/WishesScreen";
import CharacterScreen from "~screens/onBoarding/CharacterScreen";
import UploadPhotoScreen from "~screens/onBoarding/UploadPhotoScreen";
import BackIcon from "~assets/back_arrow.svg";
import { useNavigation } from "@react-navigation/native";
import PasswordScreen from "~screens/public/PasswordScreen";

const PublicStack = createNativeStackNavigator<PublicNavigationParamList>();

const PublicNavigator: FC = () => {
  const navigation = useNavigation();
  return (
    <PublicStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
        headerBackVisible: false,
        headerLeft: (props) => <BackIcon onPress={() => {
          if(props.canGoBack) {
            navigation.goBack();
          }
        }}/>
        //headerBackImageSource: { uri: require("~assets/back_arrow.svg") },
      }}
    >
      <PublicStack.Screen name="Welcome" component={WelcomeScreen} />
      <PublicStack.Screen name="EmailLogin" component={EmailLoginScreen} />
      <PublicStack.Screen name="ReSendEmail" component={ReSendEmailScreen} />
      <PublicStack.Screen name="Password" component={PasswordScreen} />
      <PublicStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <PublicStack.Screen name="AllreadyVerified" component={AllreadyVerifiedScreen} />
      <PublicStack.Screen name="Home" component={HomeScreen} />
      <PublicStack.Screen name="FirstName" component={FirstNameScreen} />
      <PublicStack.Screen name="Describes" component={DescribesScreen} />
      <PublicStack.Screen name="Country" component={CountryScreen} />
      <PublicStack.Screen name="Age" component={AgeScreen} />
      <PublicStack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <PublicStack.Screen name="Adventurous" component={AdventurousScreen} />
      <PublicStack.Screen name="Adventure" component={AdventureScreen} />
      <PublicStack.Screen name="Wishes" component={WishesScreen} />
      <PublicStack.Screen name="Character" component={CharacterScreen} />
      <PublicStack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
    </PublicStack.Navigator>
  );
};

export default PublicNavigator;
