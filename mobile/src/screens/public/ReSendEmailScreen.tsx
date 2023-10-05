import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "native-base";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { resendEmailVerificationAction } from "~redux/auth/middleware";
import { useAppDispatch } from "~redux/store";

type ReSendEmailScreenProps = NativeStackScreenProps<PublicNavigationParamList, "ReSendEmail">;

const ReSendEmailScreen: FC<ReSendEmailScreenProps> = ({ route }: ReSendEmailScreenProps) => {
  const { t } = useTranslation();

  const { email } = route.params;

  const dispatch = useAppDispatch();

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" textAlign={"start"} bold>
        {t("pleaseCheckYour")}
      </Text>
      <Text mt={50} mx={25} fontSize="xl" textAlign={"start"} bold>
        {t("comeBackHere")}
      </Text>

      <View
        w={"100%"}
        bottom={0}
        position={"absolute"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Text mt={20} mb={5} fontSize="md" textAlign={"center"}>
          {t("expireVerification")}
        </Text>

        <Button
          variant="solid"
          _text={{ fontSize: "lg" }}
          mb={10}
          width={"80%"}
          onPress={() => {
            dispatch(resendEmailVerificationAction({ email: email }));
          }}
        >
          {t("reSendEmail")}
        </Button>
      </View>
    </View>
  );
};

export default ReSendEmailScreen;
