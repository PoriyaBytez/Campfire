import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, FormControl, Box, Select } from "native-base";
import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { OnboardingStep } from "~redux/auth/types";
import { masterSelector } from "~redux/masters/masterSlice";
import { fetchMastersActions } from "~redux/masters/middleware";
import { Character, Describes } from "~redux/masters/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { profileSelector } from "~redux/profile/profileSlice";
import { useAppDispatch } from "~redux/store";
import { LoadingState } from "~screens/types";
import { trackEvent } from "~utils/helpers";

type CharacterScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Character">;

const CharacterScreen: FC<CharacterScreenProps> = ({ navigation }: CharacterScreenProps) => {
  const { t } = useTranslation();

  const { loading, character: charactersData, describes: gendersData } = useSelector(masterSelector);
  const { profile } = useSelector(profileSelector);
  const dispatch = useAppDispatch();

  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    if (charactersData.length === 0) {
      dispatch(fetchMastersActions());
    } else {
      const genderFound = gendersData?.find((item: Describes) => item._id === profile?.gender);
      if(genderFound && genderFound?.value === "man") {
        setCharacterList(charactersData.filter((item: Character) => item.gender?.toLowerCase() === "male"));
      } else if(genderFound && genderFound?.value === "woman") {
        setCharacterList(charactersData.filter((item: Character) => item.gender?.toLowerCase() === "female"));
      } else if(genderFound && genderFound.value === "non-binary") {
        setCharacterList(charactersData);
  
      }
    }
  }, [charactersData]);

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("almostDoneChoose")}
      </Text>

      <Box flex={0.75} width="100%" px={"1/6"} justifyContent="center" alignItems="center">
        <FormControl>
          <Select
            size={"xl"}
            textAlign="center"
            variant="underlined"
            selectedValue={selectedCharacter ? selectedCharacter._id : undefined}
            onValueChange={(value: string) =>
              setSelectedCharacter(characterList.find((item: Character) => item._id === value))
            }
          >
            {characterList.map((item: Character) => (
              <Select.Item label={item.character!!} value={item._id!!} />
            ))}
          </Select>
        </FormControl>
      </Box>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={loading === LoadingState.LOADING || !selectedCharacter}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: {
              ...profile,
              character: selectedCharacter?.character,
              profileStatus: OnboardingStep.PHOTOS,
            },
          });
          dispatch(
            updateProfileAction({
              ...profile,
              character: selectedCharacter?._id,
              profileStatus: OnboardingStep.PHOTOS,
            })
          );
          navigation.navigate("UploadPhoto");
        }}
        bgColor={
          loading === LoadingState.LOADING || !selectedCharacter ? "muted.500" : "primary.50"
        }
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default CharacterScreen;
