import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "native-base";
import React, { FC, useEffect ,useLayoutEffect} from "react";
import { useTranslation } from "react-i18next";
import InfoIcon from "~assets/info_icon.svg";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
type AllreadyVerifiedScreenProps = NativeStackScreenProps<
  PublicNavigationParamList,
  "AllreadyVerified"
>;

const AllreadyVerifiedScreen: FC<AllreadyVerifiedScreenProps> = ({
  navigation,
}: AllreadyVerifiedScreenProps) => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props: HeaderButtonProps) => <InfoIcon width={32} height={32} />,
    });
  }, [navigation]);
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
    <Text mt={50} mx={25} fontSize="xl" bold>
      {t("congratsYouAreOnTheWaitlist")}
    </Text>
     
    </View>
  );
};

export default AllreadyVerifiedScreen;
