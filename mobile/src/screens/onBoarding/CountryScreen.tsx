import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, FormControl, Box, Select } from "native-base";
import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { OnboardingStep } from "~redux/auth/types";
import { masterSelector } from "~redux/masters/masterSlice";
import { fetchMastersActions } from "~redux/masters/middleware";
import { Country, Describes } from "~redux/masters/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { profileSelector } from "~redux/profile/profileSlice";
import { useAppDispatch } from "~redux/store";
import { LoadingState } from "~screens/types";
import { trackEvent } from "~utils/helpers";

type CountryScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Country">;
const CountryScreen: FC<CountryScreenProps> = ({ navigation }: CountryScreenProps) => {
  const { t } = useTranslation();

  const { loading, countries: countriesData, describes: gendersData } = useSelector(masterSelector);
  const { profile } = useSelector(profileSelector);
  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = useState<Country>();

  useEffect(() => {
    if (countriesData.length === 0) {
      dispatch(fetchMastersActions());
    }
  }, [countriesData]);

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whichCounterAreYouIn")}
      </Text>

      <Box flex={0.75} width="100%" px={"1/6"} justifyContent="center" alignItems="center">
        <FormControl>
          <Select
            size={"xl"}
            textAlign="center"
            variant="underlined"
            pointerEvents="none"
            
            selectedValue={selectedCountry ? selectedCountry._id : undefined}
            onValueChange={(value: string) =>
              setSelectedCountry(countriesData.find((item: Country) => item._id === value))
            }
          >
            {countriesData.map((item: Country) => (
              <Select.Item label={item.name!!} value={item._id!!} />
            ))}
          </Select>
        </FormControl>
      </Box>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={loading === LoadingState.LOADING || !selectedCountry}
        onPress={() => {
          const genderFound = gendersData.find((item: Describes) => item._id === profile?.gender);
          if (genderFound) {
            if (["man", "woman", "non-binary"].includes(genderFound.value!!)) {
              trackEvent("Onboarding", {
                profileData: { ...profile, country: selectedCountry?.name, profileStatus: OnboardingStep.AGE },
              });
              dispatch(
                updateProfileAction({
                  ...profile,
                  country: selectedCountry?._id,
                  profileStatus: OnboardingStep.AGE,
                })
              );
              navigation.navigate("Age");
            } else {
             
              trackEvent("Onboarding", {
                profileData: { ...profile, country: selectedCountry?.name,
                  age: "Not Applicable",
                  profileStatus: OnboardingStep.CREATE_PROFILE },
              });
              dispatch(
                updateProfileAction({
                  ...profile,
                  country: selectedCountry?._id,
                  age: "NA",
                  profileStatus: OnboardingStep.CREATE_PROFILE,
                })
              );
            
              navigation.navigate("CreateProfile");
            }
          } else {
            dispatch(
              updateProfileAction({
                ...profile,
                country: selectedCountry?._id,
                profileStatus: OnboardingStep.AGE,
              })
            );
            navigation.navigate("Age");
          }
        }}
        bgColor={loading === LoadingState.LOADING || !selectedCountry ? "muted.500" : "primary.50"}
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default CountryScreen;
