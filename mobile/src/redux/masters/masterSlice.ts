import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MasterState } from "./types";
import { LoadingState } from "~screens/types";
import { RootState } from "~redux/store";
import { fetchMastersActions } from "./middleware";

const initialState: MasterState = {
  loading: LoadingState.DEFAULT,
  describes: [],
  character: [],
  countries: [],
};

const masterReducer = createSlice({
  name: "Master",
  initialState: initialState,
  reducers: {
    setLoading: (state: MasterState, { payload }: PayloadAction<LoadingState>) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMastersActions.fulfilled,
      (state: MasterState, { payload }: PayloadAction<MasterState>) => {
        state.describes = payload.describes;
        state.character = payload.character;
        state.countries = payload.countries;
        state.loading = LoadingState.DEFAULT;
      }
    );
    builder.addCase(
      fetchMastersActions.rejected,
      (state: MasterState, { payload }: PayloadAction<any>) => {
        state.loading = LoadingState.DEFAULT;
      }
    );
  },
});

export const {
  setLoading: setMasterLoading,
} = masterReducer.actions;

export const masterSelector = (state: RootState) => state.Master;

export default masterReducer.reducer;
