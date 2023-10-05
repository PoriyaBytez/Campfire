import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character, Country, Describes, MasterState } from "./types";
import { setMasterLoading } from "./masterSlice";
import { LoadingState } from "~screens/types";
import { characterRequestAsync, countryRequestAsync, describesRequestAsync } from "./services";
import { ResponseMapper } from "~services/types";
import { HttpStatusCode } from "axios";

export const fetchMastersActions = createAsyncThunk<MasterState>(
    "profile/masters",
    async (_, { rejectWithValue, dispatch }) => {
      dispatch(setMasterLoading(LoadingState.LOADING));
  
      try {
        const masterResponse: MasterState = {
            describes: [],
            countries: [],
            character: [],
            loading: LoadingState.DEFAULT
        };
        const describeResponse: ResponseMapper<Describes[]> = await describesRequestAsync();
        if (describeResponse && describeResponse.code === HttpStatusCode.Ok && describeResponse.data) {
            masterResponse.describes = describeResponse.data;
        }

        const countriesResponse: ResponseMapper<Country[]> = await countryRequestAsync();
        if (countriesResponse && countriesResponse.code === HttpStatusCode.Ok && countriesResponse.data) {
            masterResponse.countries = countriesResponse.data;
        }

        const characterResponse: ResponseMapper<Character[]> = await characterRequestAsync();
        if (characterResponse && characterResponse.code === HttpStatusCode.Ok && characterResponse.data) {
            masterResponse.character = characterResponse.data;
        }
        
        return masterResponse;
      } catch (error) {
        return rejectWithValue(error as Error);
      } 
    }
  );