import { OnboardingStep } from "~redux/auth/types";
import { LoadingState } from "~screens/types";
import { Image as RNImage } from "react-native-image-crop-picker";

export type ProfileState = {
    loading: LoadingState;
    errorMessage?: string;
    profile: ProfileItem | null;
}

export type ProfileItem = {
    _id?: string;
    userId?: string;
    firstName?: string;
    gender?: string;
    age?: string;
    country?: string;
    adventuresDone?: string;
    topWishes?: string;
    nextAdventures?: string;
    character?: string;
    images?: string[];
    profileStatus?: OnboardingStep;
}

export type ProfilePhotos = {
    selectedImageFirst?: RNImage,
    selectedImageSecond?: RNImage,
    selectedImageThird?: RNImage,
}

export type ProfileWithPhotos = ProfileItem & ProfilePhotos