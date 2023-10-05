import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, Box, FormControl, Select } from "native-base";
import React, { FC, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DropdownView, { DropdownProps } from "~components/Dropdown";
import { useAppDispatch } from "~redux/store";
import { DropDownItem, LoadingState } from "~screens/types";
import { useSelector } from "react-redux";
import { profileSelector } from "~redux/profile/profileSlice";
import { updateProfileAction } from "~redux/profile/middleware";
import { OnboardingStep } from "~redux/auth/types";
import { Describes } from "~redux/masters/types";
import { trackEvent } from "~utils/helpers";

type AgeScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Age">;
const AgeScreen: FC<AgeScreenProps> = ({ navigation }: AgeScreenProps) => {
  const { t } = useTranslation();

  const [age, setAge] = useState<Describes>();

  const dispatch = useAppDispatch();
  const { loading, profile } = useSelector(profileSelector);

  const items = useMemo(() => {
    const data: Describes[] = [];
    for (let index = 18; index < 419; index++) {
      data.push({ label: `${index}`, value: `${index}` });
    }
    return data;
  }, []);

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatIsYourAge")}
      </Text>

      <Box flex={0.75} width="100%" px={"1/6"} justifyContent="center" alignItems="center">
        <FormControl>
          <Select
            size={"xl"}
            textAlign="center"
            variant="underlined"
            selectedValue={age ? age.value : undefined}
            onValueChange={(value: string) =>
              setAge(items.find((item: Describes) => item.value === value))
            }
          >
            {items.map((item: Describes) => (
              <Select.Item label={item.label!!} value={item.value!!} />
            ))}
          </Select>
        </FormControl>
      </Box>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={loading === LoadingState.LOADING || !age}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: {
              ...profile,
              age: age?.value,
              profileStatus: OnboardingStep.CREATE_PROFILE,
            },
          });
          dispatch(
            updateProfileAction({
              ...profile,
              age: age?.value,
              profileStatus: OnboardingStep.CREATE_PROFILE,
            })
          );
          navigation.navigate("CreateProfile");
        }}
        bgColor={loading === LoadingState.LOADING || !age ? "muted.500" : "primary.50"}
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default AgeScreen;
