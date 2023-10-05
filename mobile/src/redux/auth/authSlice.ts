import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";
import { LoadingState } from "~screens/types";
import { RootState } from "~redux/store";
import {
  joinWaitlistAction,
  resendEmailVerificationAction,
  validateEmailAction,
} from "./middleware";
import { ResponseMapper } from "~services/types";
import { ProfileItem } from "~redux/profile/types";

const initialState: AuthState = {
  user: null,
  loading: LoadingState.DEFAULT,
  errorMessage: undefined,
};

const authReducer = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setLoading: (state: AuthState, { payload }: PayloadAction<LoadingState>) => {
      state.loading = payload;
    },
    setErrorMessage: (state: AuthState, { payload }) => {
      state.errorMessage = payload || undefined;
    },
    resetState: (state: AuthState) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      validateEmailAction.fulfilled,
      (
        state: AuthState,
        { payload }: PayloadAction<ResponseMapper<{ user: User; profile: ProfileItem }>>
      ) => {
        if (payload.message === "PROCESS_LOGIN") {
          state.user = {
            ...(payload.data?.user as User),
            profileStatus: payload.data?.profile?.profileStatus!!,
          };
        } else if (payload.message === "VERIFICATION_EMAIL_SENT") {
          state.loading = LoadingState.SUCCESS;
          state.user = null;
        }
      }
    );
    builder.addCase(
      joinWaitlistAction.fulfilled,
      (state: AuthState, { payload }: PayloadAction<ResponseMapper<any>>) => {
        if (payload.message === "VERIFICATION_EMAIL_SENT") {
          state.loading = LoadingState.SUCCESS;
          state.user = null;
        }
      }
    );
    builder.addCase(
      resendEmailVerificationAction.fulfilled,
      (state: AuthState, { payload }: PayloadAction<ResponseMapper<any>>) => {
        state.loading = LoadingState.DEFAULT;
      }
    );
    builder.addCase(
      validateEmailAction.rejected,
      (state: AuthState, { payload }: PayloadAction<any>) => {
        state.errorMessage = payload as string;
      }
    );
  },
});

export const {
  setLoading: setAuthLoading,
  setErrorMessage,
  resetState: resetAuthState,
} = authReducer.actions;

export const authSelector = (state: RootState) => state.Auth;

export default authReducer.reducer;
