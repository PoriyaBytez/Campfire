import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { View, Text, Fab, ArrowForwardIcon, FormControl, Input, Box, Button } from "native-base";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfoIcon from "~assets/info_icon.svg";
import { useSelector } from "react-redux";
import { authSelector, resetAuthState } from "~redux/auth/authSlice";
import { useAppDispatch } from "~redux/store";
import { debounceForFunc, validateEmail } from "~utils/helpers";
import { LoadingState } from "~screens/types";
import { joinWaitlistAction, validateEmailAction } from "~redux/auth/middleware";
import { OnboardingStep } from "~redux/auth/types";

type EmailLoginScreenProps = NativeStackScreenProps<PublicNavigationParamList, "EmailLogin">;
const EmailLoginScreen: FC<EmailLoginScreenProps> = ({ navigation }: EmailLoginScreenProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const [isFabDisabled, setIsFabDisabled] = useState<boolean>(true);

  const { loading, errorMessage, user } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("USERDATA", user);
    if (user?.profileStatus === OnboardingStep.INITIAL) {
      navigation.navigate("Home");
    } else if (user?.profileStatus === OnboardingStep.FIRST_NAME) {
      navigation.navigate("FirstName");
    } else if (user?.profileStatus === OnboardingStep.GENDER) {
      navigation.navigate("Describes");
    } else if (user?.profileStatus === OnboardingStep.COUNTRY) {
      navigation.navigate("Country");
    } else if (user?.profileStatus === OnboardingStep.AGE) {
      navigation.navigate("Age");
    } else if (user?.profileStatus === OnboardingStep.CREATE_PROFILE) {
      navigation.navigate("CreateProfile");
    } else if (user?.profileStatus === OnboardingStep.ADVENTURE) {
      navigation.navigate("Adventurous");
    } else if (user?.profileStatus === OnboardingStep.TOP_WISHES) {
      navigation.navigate("Wishes");
    } else if (user?.profileStatus === OnboardingStep.NEXT_ADVENTURE) {
      navigation.navigate("Adventure");
    } else if (user?.profileStatus === OnboardingStep.CHARACTER) {
      navigation?.navigate("Character");
    } else if (user?.profileStatus === OnboardingStep.PHOTOS) {
      navigation?.navigate("UploadPhoto");
    }
  }, [user]);

  useEffect(() => {
    if (errorMessage === "JOIN_WAITLIST") {
      setEmailError("Your university not signedup yet. please join wait list.");
    } else if (errorMessage === "IN_WHITELIST_QUEUE" || errorMessage === "NOT_ACTIVATED") {
      navigation.navigate("AllreadyVerified", { email: email });
      dispatch(resetAuthState());
    }
  }, [errorMessage]);

  useEffect(() => {
    if (loading === LoadingState.SUCCESS && !user) {
      // as we have sent the verification email so will navigate to that screen with email id which we entered.
      navigation.navigate("ReSendEmail", { email: email });
      dispatch(resetAuthState());
    }
  }, [loading, user]);

  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
    if(errorMessage) {
      dispatch(resetAuthState());
    }
    debounceForFunc(() => {
      if (text.length === 0) {
        setIsFabDisabled(true);
        setEmailError("Please enter email address.");
      } else if (!validateEmail(text)) {
        setIsFabDisabled(true);
        setEmailError("Please enter valid email address");
      } else {
        setIsFabDisabled(false);
        setEmailError("");
      }
    }, 750);
  }, [errorMessage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props: HeaderButtonProps) => <InfoIcon width={32} height={32} />,
    });
  }, [navigation]);

  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("whatIsYourWorkOrUniversityEmail")}
      </Text>
      <Box
        flex={0.80}
        width="100%"
        px={"1/6"}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl isInvalid={emailError ? emailError.length > 0 : false}>
          <Input
            size={"xl"}
            keyboardType="email-address"
            autoCapitalize="none"
            textAlign="center"
            placeholder={t("tapHereToType")}
            variant="underlined"
            onChangeText={onChangeEmailText}
            value={email} 
          />
          <FormControl.ErrorMessage fontSize={"lg"}>{emailError}</FormControl.ErrorMessage>
        </FormControl>
      </Box>
      {errorMessage === "JOIN_WAITLIST" ? (
          <Button
          variant="solid"
          _text={{ fontSize: "lg" }}
          mx={10}
          onPress={() => {
            dispatch(joinWaitlistAction({ email: email }));
          }}
        >
          {t("joinWaitlist")}
        </Button>
       
      ) : null}

      {errorMessage ? null : (
        <Fab
          renderInPortal={false}
          shadow={2}
          onPress={() => {
            dispatch(validateEmailAction({ email: email }));
          }}
          bgColor={loading === LoadingState.LOADING || isFabDisabled ? "muted.500" : "primary.50"}
          size="sm"
          disabled={loading === LoadingState.LOADING || isFabDisabled}
          mb={4}
          icon={<ArrowForwardIcon color={"bg.50"} size={6} />}
        />
      )}
    </View>
  );
};

export default EmailLoginScreen;
