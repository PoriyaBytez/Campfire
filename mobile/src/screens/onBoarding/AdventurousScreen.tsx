import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, TextArea, Box, FormControl } from "native-base";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "~redux/store";
import { useSelector } from "react-redux";
import { profileSelector } from "~redux/profile/profileSlice";
import { LoadingState } from "~screens/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { OnboardingStep } from "~redux/auth/types";
import { trackEvent } from "~utils/helpers";
type AdventurousScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Adventurous">;
const AdventurousScreen: FC<AdventurousScreenProps> = ({ navigation }: AdventurousScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { profile, loading } = useSelector(profileSelector);

  const [adventurous, setAdventurous] = useState<string>();

  const onValueChange = (value: string) => {
    setAdventurous(value);
  };
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatIsTheMost")}
      </Text>
      <Box alignItems="center" w="100%">
        <FormControl isInvalid={adventurous ? adventurous?.length < 3 : false}>
          <TextArea
            borderWidth={2}
            h={200}
            placeholder={t("egIWentHusky")}
            mb={4}
            value={adventurous}
            onChangeText={(text) => onValueChange(text)}
            mt={5}
            mx={5}
            borderRadius={10}
            autoCompleteType={undefined}
          />
          <FormControl.ErrorMessage
            textAlign={"center"}
            justifyContent="center"
            alignItems="center"
          >
            {t("fieldIsEmpty")}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={(adventurous && adventurous?.length < 3) || loading === LoadingState.LOADING}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: {
              ...profile,
              adventuresDone: adventurous,
              profileStatus: OnboardingStep.TOP_WISHES,
            },
          });
          dispatch(
            updateProfileAction({
              ...profile,
              adventuresDone: adventurous,
              profileStatus: OnboardingStep.TOP_WISHES,
            })
          );
          navigation.navigate("Wishes");
        }}
        bgColor={
          (adventurous && adventurous?.length < 3) || loading === LoadingState.LOADING
            ? "muted.500"
            : "primary.50"
        }
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default AdventurousScreen;
