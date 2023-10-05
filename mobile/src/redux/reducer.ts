import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import masterSlice from "./masters/masterSlice";
import profileSlice from "./profile/profileSlice";

const rootReducer = combineReducers({
    Auth: authSlice,
    Master: masterSlice,
    Profile: profileSlice
});

export default rootReducer;
