import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileItem, ProfileState } from "./types";
import { LoadingState } from "~screens/types";
import { RootState } from "~redux/store";
import { fetchProfileByIdAction, updateProfileAction, updateProfilePhotosAction } from "./middleware";
const initialState: ProfileState = {
  loading: LoadingState.DEFAULT,
  profile: null,
};

const profileReducer = createSlice({
  name: "Profile",
  initialState: initialState,
  reducers: {
    setLoading: (state: ProfileState, { payload }: PayloadAction<LoadingState>) => {
      state.loading = payload;
    },
    setProfile: (state: ProfileState, { payload }: PayloadAction<ProfileItem>) => {
      state.profile = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProfileByIdAction.fulfilled,
      (state: ProfileState, { payload }: PayloadAction<ProfileItem>) => {
        state.profile = payload;
      }
    );

    builder.addCase(
      updateProfileAction.fulfilled,
      (state: ProfileState, { payload }: PayloadAction<ProfileItem>) => {
        state.profile = payload;
      }
    );

    builder.addCase(
      updateProfilePhotosAction.fulfilled,
      (state: ProfileState, { payload }: PayloadAction<ProfileItem>) => {
        state.profile = payload;
      }
    );

  
  },
});

export const { setLoading: setProfileLoading, setProfile } = profileReducer.actions;

export const profileSelector = (state: RootState) => state.Profile;

export default profileReducer.reducer;
