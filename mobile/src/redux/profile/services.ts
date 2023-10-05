import { axiosInstance, isAxiosError } from "~services/api";
import { ProfileItem, ProfileWithPhotos } from "./types";
import { OnboardingStep } from "~redux/auth/types";

export const fetchProfileByUserIdAsync = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`profiles/${userId}`);
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};

export const updateProfileAsync = async (profileItem: ProfileItem) => {
  try {
    const formData = new FormData();
    formData.append("firstName", profileItem.firstName);
    formData.append("age", profileItem.age);
    formData.append("adventuresDone", profileItem.adventuresDone);
    formData.append("gender", profileItem.gender);
    formData.append("country", profileItem.country);
    formData.append("character", profileItem.character);
    formData.append("nextAdventures", profileItem.nextAdventures);
    formData.append("profileStatus", profileItem.profileStatus);
    formData.append("topWishes", profileItem.topWishes);

    const response = await axiosInstance.put(`profiles/${profileItem._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};

export const uploadProfilePhotosAsync = async (profileItem: ProfileWithPhotos) => {
  try {
    const formData = new FormData();
    console.log("PROFILEPHOTOS", profileItem.selectedImageFirst?.path);
    if (profileItem.selectedImageFirst) {
      formData.append("images", {
        uri: profileItem.selectedImageFirst?.path,
        type: profileItem.selectedImageFirst?.mime,
        name: "ProfileImage1.jpg"
      });
    }
    if (profileItem.selectedImageSecond) {
      formData.append("images", {
        uri: profileItem.selectedImageSecond?.path,
        type: profileItem.selectedImageSecond?.mime,
        name: "ProfileImage2.jpg"
      });
    }
    if (profileItem.selectedImageThird) {
      formData.append("images", {
        uri: profileItem.selectedImageThird?.path,
        type: profileItem.selectedImageThird?.mime,
        name: "ProfileImage3.jpg"
      });
    }

    formData.append("profileStatus", OnboardingStep.COMPLETED);
    formData.append("userId", profileItem.userId);

    console.log("FORMDATA", formData);

    const response = await axiosInstance.put(`profiles/${profileItem._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 1000 * 60 * 5,
    });
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};
