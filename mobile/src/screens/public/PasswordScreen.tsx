import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Fab, ArrowForwardIcon, FormControl, Box, Input } from "native-base";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
type PasswordScreenProps = NativeStackScreenProps<PublicNavigationParamList, "Password">;
const PasswordScreen: FC<PasswordScreenProps> = ({  navigation }: PasswordScreenProps) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState<string>();

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(true);
  const onValueChange = (value: string) => {
    setPassword(value);
    if (value?.length >= 7) {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  };
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("welcomeBack")}
      </Text>
      <Box mt={200}  width="70%" ml={20} mr={20} px={"1"} justifyContent="center" alignItems="center" >
        <FormControl>
          <Input
            size={"xl"}
            textAlign="center"
            placeholder={t('enterPassword')}
            variant="underlined"
            value={password}
            onChangeText={(value)=>onValueChange(value)}
          />
          <FormControl.ErrorMessage>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Text
        mt={5}
        textAlign={"center"}
        color={"primary.50"}
        onPress={() => navigation.navigate("Password")}
      >
        {t('forgotPassword')}
      </Text>

      <Fab
        renderInPortal={false}
        shadow={2}
        onPress={() => {
          navigation.navigate("ReSendEmail");
        }}
        bgColor={isNextButtonDisabled ? "muted.500" : "primary.50"}
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default PasswordScreen;
