import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon } from "native-base";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { OnboardingStep } from "~redux/auth/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { profileSelector } from "~redux/profile/profileSlice";
import { useAppDispatch } from "~redux/store";
import { trackEvent } from "~utils/helpers";

type CreateProfileScreenProps = NativeStackScreenProps<PublicNavigationParamList, "CreateProfile">;

const CreateProfileScreen: FC<CreateProfileScreenProps> = ({
  navigation,
}: CreateProfileScreenProps) => {
  const { t } = useTranslation();

  const { profile } = useSelector(profileSelector);
  const dispatch = useAppDispatch();

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("perfectLetSCreateAProfile")}
      </Text>

      <Fab
        renderInPortal={false}
        shadow={2}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: { ...profile, profileStatus: OnboardingStep.ADVENTURE },
          });
          dispatch(updateProfileAction({ ...profile, profileStatus: OnboardingStep.ADVENTURE }));
          navigation.navigate("Adventurous");
        }}
        bgColor={"primary.50"}
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default CreateProfileScreen;
