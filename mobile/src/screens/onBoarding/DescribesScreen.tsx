import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, FormControl, Box, Select } from "native-base";
import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { OnboardingStep } from "~redux/auth/types";
import { masterSelector } from "~redux/masters/masterSlice";
import { fetchMastersActions } from "~redux/masters/middleware";
import { Describes } from "~redux/masters/types";
import { updateProfileAction } from "~redux/profile/middleware";
import { profileSelector } from "~redux/profile/profileSlice";
import { useAppDispatch } from "~redux/store";
import { LoadingState } from "~screens/types";
import { trackEvent } from "~utils/helpers";

type DescribesScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Describes">;
const DescribesScreen: FC<DescribesScreenProps> = ({ navigation }: DescribesScreenProps) => {
  const { t } = useTranslation();

  const { loading, describes: describesData } = useSelector(masterSelector);
  const { profile } = useSelector(profileSelector);
  const dispatch = useAppDispatch();

  const [selectedDescribeItem, setSelectedDescribeItem] = useState<Describes>();

  useEffect(() => {
    if (describesData.length === 0) {
      dispatch(fetchMastersActions());
    }
  }, [describesData]);
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatBestDescribesYou")}
      </Text>

      <Box flex={0.75} width="100%" px={"1/6"} justifyContent="center" alignItems="center">
        <FormControl>
          <Select
            size={"xl"}
            textAlign="center"
            variant="underlined"
            selectedValue={selectedDescribeItem ? selectedDescribeItem._id : undefined}
            onValueChange={(value: string) =>
              setSelectedDescribeItem(describesData.find((item) => item._id === value))
            }
          >
            {describesData.map((item: Describes) => (
              <Select.Item label={item.label!!} value={item._id!!} />
            ))}
          </Select>
        </FormControl>
      </Box>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={loading === LoadingState.LOADING || !selectedDescribeItem}
        onPress={() => {
          trackEvent("Onboarding", {
            profileData: { ...profile, gender: selectedDescribeItem?.value, profileStatus: OnboardingStep.COUNTRY },
          });
          dispatch(updateProfileAction({...profile, gender: selectedDescribeItem?._id, profileStatus: OnboardingStep.COUNTRY }))
          navigation.navigate("Country");
        }}
        bgColor={
          loading === LoadingState.LOADING || !selectedDescribeItem ? "muted.500" : "primary.50"
        }
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default DescribesScreen;
