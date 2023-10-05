import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Checkbox,
  View,
  Text,
  Image,
  Fab,
  ArrowForwardIcon,
  useToast,
  Pressable,
  Toast,
  FormControl,
} from "native-base";
import { useTranslation } from "react-i18next";
import CameraIcon from "~assets/photo_placeholder.svg";
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from "react-native-permissions";
import { Image as RNImage, openPicker } from "react-native-image-crop-picker";
import { useAppDispatch } from "~redux/store";
import { useSelector } from "react-redux";
import { profileSelector } from "~redux/profile/profileSlice";
import { updateProfilePhotosAction } from "~redux/profile/middleware";
import { OnboardingStep } from "~redux/auth/types";
import DeviceInfo from "react-native-device-info";
type UploadPhotoScreenProps = NativeStackScreenProps<PublicNavigationParamList, "UploadPhoto">;

const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({}: UploadPhotoScreenProps) => {
  const dispatch = useAppDispatch();
  const { profile } = useSelector(profileSelector);
  const [groupValue, setGroupValue] = useState([]);

  useEffect(() => {
    if (profile?.profileStatus === OnboardingStep.COMPLETED) {
      Toast.show({ title: "Onboarding process has been sucessfully completed", duration: 3000 });
    }
  }, [profile]);

  const [selectedImageFirst, setSelectedImageFirst] = useState<RNImage>();
  const [selectedImageSecond, setSelectedImageSecond] = useState<RNImage>();
  const [selectedImageThird, setSelectedImageThird] = useState<RNImage>();
  const { t } = useTranslation();
  const toast = useToast();
  const editImage = async (count: number) => {
    let status: PermissionStatus = RESULTS.UNAVAILABLE;

    const androidPermssion = Number(DeviceInfo.getSystemVersion()) >= 13 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    const readPermission = await check(
      Platform.OS === "android"
        ? androidPermssion
        : PERMISSIONS.IOS.PHOTO_LIBRARY
    );
    status = readPermission;
    if (readPermission === RESULTS.UNAVAILABLE) {
    } else if (readPermission === RESULTS.DENIED) {
      const newLocPermission = await request(
        Platform.OS === "android"
          ? androidPermssion
          : PERMISSIONS.IOS.PHOTO_LIBRARY
      );
      status = newLocPermission;
    }

    if (status === RESULTS.GRANTED) {
      openPicker({
        width: 500,
        height: 500,
        cropping: false,
        mediaType: "photo",
        writeTempFile: true,
      })
        .then((image) => {
          console.log("IMAGE ==>", image);
          if (count == 1) {
            setSelectedImageFirst(image);
          } else if (count == 2) {
            setSelectedImageSecond(image);
          } else {
            setSelectedImageThird(image);
          }
        })
        .catch((e) => {
          console.log("errror", e);
          toast.show({ description: e.error });
        });
    } else {
      openSettings();
    }
  };
  return (
    <View flex={1} bgColor={"bg.50"} pt={10}>
      <Text mt={50} mx={25} fontSize="xl" bold>
        {t("lastStepUpload")}
      </Text>

      <View mt={100} flex={0.25}>
        <View flex={1} flexDirection={"row"} justifyContent={"space-between"} ml={5} mr={5}>
          {selectedImageFirst ? (
            <Pressable onPress={() => editImage(1)}>
              <Image height={100} width={100} source={{ uri: selectedImageFirst?.path }} />
            </Pressable>
          ) : (
            <CameraIcon height={100} width={100} onPress={() => editImage(1)} />
          )}

          {selectedImageSecond ? (
            <Pressable height={100} width={100} onPress={() => editImage(2)}>
              <Image height={100} width={100} source={{ uri: selectedImageSecond?.path }} />
            </Pressable>
          ) : (
            <CameraIcon height={100} width={100} onPress={() => editImage(2)} />
          )}

          {selectedImageThird ? (
            <Pressable height={100} width={100} onPress={() => editImage(3)}>
              <Image height={100} width={100} source={{ uri: selectedImageThird?.path }} />
            </Pressable>
          ) : (
            <CameraIcon height={100} width={100} onPress={() => editImage(3)} />
          )}
        </View>
      </View>
      <View mx={10} mt={10}>
        <FormControl
          isInvalid={
            !selectedImageFirst ||
            !selectedImageSecond ||
            !selectedImageThird ||
            groupValue.length < 3
          }
        >
          <Checkbox.Group
            accessibilityLabel="choose values"
            defaultValue={groupValue}
            onChange={(values) => {
              setGroupValue(values || []);
            }}
          >
            <Checkbox value="one" my={4}>
              {t("iHaveUploaded")}
            </Checkbox>
            <Checkbox value="two" my={4}>
              {t("myFirstPhoto")}
            </Checkbox>
            <Checkbox value="three" my={4}>
              {t("iHaveAtLeastOne")}
            </Checkbox>
          </Checkbox.Group>
          <FormControl.ErrorMessage>{t("profilePhotosValidation")}</FormControl.ErrorMessage>
        </FormControl>
      </View>

      <Fab
        renderInPortal={false}
        shadow={2}
        disabled={
          !selectedImageFirst ||
          !selectedImageSecond ||
          !selectedImageThird ||
          groupValue.length < 3
        }
        onPress={() => {
          dispatch(
            updateProfilePhotosAction({
              ...profile,
              selectedImageFirst,
              selectedImageSecond,
              selectedImageThird,
            })
          );
        }}
        bgColor={
          !selectedImageFirst ||
          !selectedImageSecond ||
          !selectedImageThird ||
          groupValue.length < 3
            ? "muted.500"
            : "primary.50"
        }
        size="md"
        icon={<ArrowForwardIcon color={"bg.50"} size="7" />}
      />
    </View>
  );
};

export default UploadPhotoScreen;
