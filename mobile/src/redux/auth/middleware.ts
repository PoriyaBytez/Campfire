import { createAsyncThunk } from "@reduxjs/toolkit";
import { ValidateEmailRequest } from "./types";
import { setAuthLoading } from "./authSlice";
import { LoadingState } from "~screens/types";
import {
  joinwaitListRequestAsync,
  resendEmailVerificationRequestAsync,
  validateEmailRequestAsync,
} from "./services";
import { ResponseMapper } from "~services/types";
import { HttpStatusCode } from "axios";
import { Toast } from "native-base";
import { setProfile } from "~redux/profile/profileSlice";

export const validateEmailAction = createAsyncThunk<any, ValidateEmailRequest>(
  "auth/validateEmail",
  async (request: ValidateEmailRequest, { rejectWithValue, dispatch }) => {
    dispatch(setAuthLoading(LoadingState.LOADING));

    try {
      const response: ResponseMapper<any> = await validateEmailRequestAsync(request);
      console.log("RESPONSE", response);
      if (response && response.code === HttpStatusCode.Ok) {
        dispatch(setProfile(response.data?.profile));
        return response;
      }
      dispatch(setAuthLoading(LoadingState.FAILURE));
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const joinWaitlistAction = createAsyncThunk<any, ValidateEmailRequest>(
  "auth/joinWaitList",
  async (request: ValidateEmailRequest, { rejectWithValue, dispatch }) => {
    dispatch(setAuthLoading(LoadingState.LOADING));

    try {
      const response: ResponseMapper<any> = await joinwaitListRequestAsync(request);
      console.log("RESPONSE", response);
      if (response && response.code === HttpStatusCode.Ok) {
        return response;
      }
      dispatch(setAuthLoading(LoadingState.FAILURE));
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const resendEmailVerificationAction = createAsyncThunk<any, ValidateEmailRequest>(
  "auth/resendEmailVerification",
  async (request: ValidateEmailRequest, { rejectWithValue, dispatch }) => {
    dispatch(setAuthLoading(LoadingState.LOADING));

    try {
      const response: ResponseMapper<any> = await resendEmailVerificationRequestAsync(request);
      console.log("RESPONSE", response);
      if (response && response.code === HttpStatusCode.Ok) {
        Toast.show({ title: response.message, duration: 3000 });
        return response;
      }
      dispatch(setAuthLoading(LoadingState.FAILURE));
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);
