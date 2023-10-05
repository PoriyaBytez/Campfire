import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Heading, Text, Image, Pressable, Box, Center, Button, View } from "native-base";
import React, { FC, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, ImageBackground } from "react-native";

type WelcomeScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Welcome">;

const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }: WelcomeScreenProps) => {
  const { t } = useTranslation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);
  return (
    <View flex={1} bgColor="bg.50">
      <Center mt={50}>
        <Heading size="xl">{t("campfire")}</Heading>
        <Text mx={25} py={10} fontSize="md" textAlign="center" bold>
          {t("connectWith")}
        </Text>
      </Center>

      <ImageBackground source={require("~assets/initialbg.png")} style={styles.bottomView}>
        <Center flex={1} pt={100}>
          <Pressable
            flexDirection="row"
            alignItems="center"
            width="80%"
            borderRadius={30}
            pl={10}
            py={3}
            textAlign="center"
            bg="bg.50"
            onPress={() => navigation.navigate("EmailLogin")}
          >
            <Image style={styles.emailIcon} source={require("~assets/email.png")} />
            <Text px={4} fontSize="lg" bold>
              {t("signInWithEmail")}
            </Text>
          </Pressable>

          <Text style={styles.otherText} fontSize="xs" color="bg.50">
            {t("byTappingSignIn")}
          </Text>
        </Center>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subText: {
    marginTop: 50,
    marginHorizontal: 25,
  },
  bottomView: {
    bottom: 0,
    position: "absolute",
    left: 0,
    right: 0,
    height: 352,
    width: "100%",
  },
  emailIcon: {
    height: 25,
    width: 30,
  },
  signInText: { marginHorizontal: 10 },
  otherText: { marginHorizontal: 55, marginTop: 20 },
});
export default WelcomeScreen;
