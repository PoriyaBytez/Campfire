import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, Box, FormControl, Input } from "native-base";
import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { OnboardingStep } from "~redux/auth/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { profileSelector } from "~redux/profile/profileSlice";
import { useAppDispatch } from "~redux/store";
import { LoadingState } from "~screens/types";
import { debounceForFunc, trackEvent } from "~utils/helpers";
type FirstNameScreenProps = NativeStackScreenProps<PublicNavigationParamList, "FirstName">;
const FirstNameScreen: FC<FirstNameScreenProps> = ({ route, navigation }: FirstNameScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [firstName, setFirstname] = useState<string>();

  const { profile, loading } = useSelector(profileSelector);

  const onFirstNameChange = useCallback((text: string) => {
    setFirstname(text);
  }, []);

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatIsYourFirstName")}
      </Text>
      <Box flex={0.75} width="100%" px={"1/6"} justifyContent="center" alignItems="center">
        <FormControl isInvalid={firstName && firstName.length > 0 ? false : true}>
          <Input
            size={"lg"}
            value={firstName}
            textAlign="center"
            onChangeText={onFirstNameChange}
            placeholder={t("tapHereToType")}
            variant="underlined"
          />
          <FormControl.ErrorMessage
            textAlign={"center"}
            justifyContent="center"
            alignItems="center"
          >
            {t("pleaseEnterYourFirstName")}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={loading === LoadingState.LOADING || !firstName}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: { ...profile, firstName: firstName, profileStatus: OnboardingStep.GENDER },
          });
          dispatch(
            updateProfileAction({
              ...profile,
              firstName: firstName,
              profileStatus: OnboardingStep.GENDER,
            })
          );
          navigation.navigate("Describes");
        }}
        bgColor={loading === LoadingState.LOADING || !firstName ? "muted.500" : "primary.50"}
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default FirstNameScreen;
