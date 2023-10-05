import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Image, Center, View, ArrowForwardIcon, Fab } from "native-base";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { authSelector } from "~redux/auth/authSlice";
import { OnboardingStep } from "~redux/auth/types";
import { fetchProfileByIdAction, updateProfileAction } from "~redux/profile/middleware";
import { profileSelector } from "~redux/profile/profileSlice";
import { useAppDispatch } from "~redux/store";
import { trackEvent } from "~utils/helpers";

type HomeScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Home">;

const HomeScreen: FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { profile } = useSelector(profileSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !profile) {
      console.log("URVISH", user);
      dispatch(fetchProfileByIdAction(user._id));
    }
  }, [user, profile]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);
  return (
    <View flex={1} bgColor="bg.50">
      <Center mt={85}>
        <Image source={require("~assets/screenshot.png")} />
      </Center>

      <Text mt={5} mx={25} fontSize="xl" textAlign={"center"} bold>
        {t("helloIamd")}
      </Text>

      <Fab
        renderInPortal={false}
        shadow={2}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: { ...profile, profileStatus: OnboardingStep.FIRST_NAME },
          });
          dispatch(updateProfileAction({ ...profile, profileStatus: OnboardingStep.FIRST_NAME }));
          navigation.navigate("FirstName");
        }}
        bgColor={"primary.50"}
        size="sm"
        disabled={false}
        mb={4}
        icon={<ArrowForwardIcon color={"bg.50"} size={6} />}
      />
    </View>
  );
};

export default HomeScreen;
