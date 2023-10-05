import { LoadingState } from "~screens/types";

export type AuthState = {
    user: User | null;
    loading: LoadingState;
    errorMessage?: string;
}

export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    isVerified: boolean;
    profileStatus: OnboardingStep;
    ip?: string;
    timezone?: string;
    createdAt?: string;
    updatedAt?: string;
    verificationTimestamp?: string;
}

export type ValidateEmailRequest = {
    email: string;
}

export enum OnboardingStep {
    INITIAL = "INITIAL",
    FIRST_NAME = "FIRST_NAME",
    GENDER = "GENDER",
    COUNTRY = "COUNTRY",
    AGE = "AGE",
    CREATE_PROFILE = "CREATE_PROFILE",
    ADVENTURE = "ADVENTURE",
    TOP_WISHES = "TOP_WISHES",
    NEXT_ADVENTURE = "NEXT_ADVENTURE",
    CHARACTER = "CHARACTER",
    PHOTOS = "PHOTOS",
    COMPLETED = "COMPLETED",
  }
  