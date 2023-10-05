import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, TextArea, FormControl, Box } from "native-base";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "~redux/store";
import { useSelector } from "react-redux";
import { profileSelector } from "~redux/profile/profileSlice";
import { LoadingState } from "~screens/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { OnboardingStep } from "~redux/auth/types";
import { trackEvent } from "~utils/helpers";
type WishesScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Wishes">;
const WishesScreen: FC<WishesScreenProps> = ({ navigation }: WishesScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { profile, loading } = useSelector(profileSelector);
  const [wishes, setWishes] = useState<string>();
  const onValueChange = (value: string) => {
    setWishes(value);
  };
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatAreYourTopWishes")}
      </Text>

      <Box alignItems="center" w="100%">
        <FormControl isInvalid={wishes ? wishes.length < 3 : false}>
          <TextArea
            autoCompleteType={undefined}
            borderWidth={2}
            h={200}
            placeholder={t("egOpenACafe")}
            mb={4}
            value={wishes}
            onChangeText={(text) => onValueChange(text)}
            mt={5}
            mx={5}
            borderRadius={10}
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
        disabled={(wishes && wishes.length < 3) || loading === LoadingState.LOADING}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: {
              ...profile,
              topWishes: wishes,
              profileStatus: OnboardingStep.NEXT_ADVENTURE,
            },
          });
          dispatch(
            updateProfileAction({
              ...profile,
              topWishes: wishes,
              profileStatus: OnboardingStep.NEXT_ADVENTURE,
            })
          );
          navigation.navigate("Adventure");
        }}
        bgColor={
          (wishes && wishes.length < 3) || loading === LoadingState.LOADING
            ? "muted.500"
            : "primary.50"
        }
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default WishesScreen;
