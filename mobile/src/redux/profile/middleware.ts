import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileItem, ProfileWithPhotos } from "./types";
import { LoadingState } from "~screens/types";

import { ResponseMapper } from "~services/types";
import { HttpStatusCode } from "axios";
import { setProfileLoading } from "./profileSlice";
import { fetchProfileByUserIdAsync, updateProfileAsync, uploadProfilePhotosAsync } from "./services";
import { Toast } from "native-base";
import { trackEvent } from "~utils/helpers";
import { OnboardingStep } from "~redux/auth/types";

export const fetchProfileByIdAction = createAsyncThunk(
  "fetch/profileByIdAction",
  async (userId: string, { rejectWithValue, dispatch }) => {
    
    dispatch(setProfileLoading(LoadingState.LOADING));

    try {
      
      const profileResponse: ResponseMapper<ProfileItem> = await fetchProfileByUserIdAsync(userId);
      if (profileResponse && profileResponse.code === HttpStatusCode.Ok && profileResponse.data) {
        return profileResponse.data;
      }

      Toast.show({ title: profileResponse.message, duration: 3000 });
      return rejectWithValue(profileResponse.message);
    } catch (error) {
      return rejectWithValue(error as Error);
    } finally {
      dispatch(setProfileLoading(LoadingState.DEFAULT));
    }
  }
);

export const updateProfileAction = createAsyncThunk(
  "updateProfileAction",
  async (profileItem: ProfileItem, { dispatch, rejectWithValue }) => {
    dispatch(setProfileLoading(LoadingState.LOADING));
    try {
        const profileResponse: ResponseMapper<ProfileItem> = await updateProfileAsync(profileItem);
        if (profileResponse && profileResponse.code === HttpStatusCode.Ok && profileResponse.data) {
          return profileResponse.data;
        }
  
        Toast.show({ title: profileResponse.message, duration: 3000 });
        return rejectWithValue(profileResponse.message);
      } catch (error) {
        return rejectWithValue(error as Error);
      } finally {
        dispatch(setProfileLoading(LoadingState.DEFAULT));
      }
  }
);

export const updateProfilePhotosAction = createAsyncThunk(
  "updateProfilePhotosAction",
  async (profileItem: ProfileWithPhotos, { dispatch, rejectWithValue }) => {
    dispatch(setProfileLoading(LoadingState.LOADING));
    try {
        const profileResponse: ResponseMapper<ProfileItem> = await uploadProfilePhotosAsync(profileItem);
        if (profileResponse && profileResponse.code === HttpStatusCode.Ok && profileResponse.data) {
          trackEvent("Onboarding", {
            profileData: {
              ...profileResponse.data,
              profileStatus: OnboardingStep.COMPLETED,
            },
          });
          return profileResponse.data;
        }
  
        Toast.show({ title: profileResponse.message, duration: 3000 });
        return rejectWithValue(profileResponse.message);
      } catch (error) {
        return rejectWithValue(error as Error);
      } finally {
        dispatch(setProfileLoading(LoadingState.DEFAULT));
      }
  }
);