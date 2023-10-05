import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, TextArea, FormControl, Box } from "native-base";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "~redux/store";
import { useSelector } from "react-redux";
import { profileSelector } from "~redux/profile/profileSlice";
import { LoadingState } from "~screens/types";
import { OnboardingStep } from "~redux/auth/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { trackEvent } from "~utils/helpers";
import { masterSelector } from "~redux/masters/masterSlice";
import { Character, Describes } from "~redux/masters/types";

type AdventureScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Adventure">;
const AdventureScreen: FC<AdventureScreenProps> = ({ navigation }: AdventureScreenProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { describes: gendersData, character: charactersData } = useSelector(masterSelector);
  const { loading, profile } = useSelector(profileSelector);
  const [adventure, setAdventure] = useState<string>();
  const onValueChange = (value: string) => {
    setAdventure(value);
  };
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatIsYourNextAdventure")}
      </Text>
      <Box alignItems="center" w="100%">
        <FormControl isInvalid={adventure ? adventure?.length < 3 : false}>
          <TextArea
            autoCompleteType={undefined}
            borderWidth={2}
            h={200}
            placeholder={t("egDaySuf")}
            mb={4}
            value={adventure}
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
        disabled={(adventure && adventure?.length < 3) || loading === LoadingState.LOADING}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: {
              ...profile,
              nextAdventures: adventure,
              profileStatus: OnboardingStep.CHARACTER,
            },
          });
          const genderFound = gendersData.find((item: Describes) => item._id === profile?.gender);
          if (genderFound) {
            if (["couple", "family"].includes(genderFound?.value!!)) {
              dispatch(
                updateProfileAction({
                  ...profile,
                  nextAdventures: adventure,
                  character:
                    charactersData?.find(
                      (item: Character) => item.character?.toLowerCase() === "other"
                    )?._id || undefined,
                  profileStatus: OnboardingStep.PHOTOS,
                })
              );
              navigation.navigate("UploadPhoto");
            } else {
              dispatch(
                updateProfileAction({
                  ...profile,
                  nextAdventures: adventure,
                  profileStatus: OnboardingStep.CHARACTER,
                })
              );
              navigation.navigate("Character");
            }
          } else {
            dispatch(
              updateProfileAction({
                ...profile,
                nextAdventures: adventure,
                profileStatus: OnboardingStep.CHARACTER,
              })
            );
            navigation.navigate("Character");
          }
        }}
        bgColor={
          (adventure && adventure?.length < 3) || loading === LoadingState.LOADING
            ? "muted.500"
            : "primary.50"
        }
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default AdventureScreen;
