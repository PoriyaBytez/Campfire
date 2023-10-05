import { axiosInstance, isAxiosError } from "~services/api";
import { ValidateEmailRequest } from "./types";

export const validateEmailRequestAsync = async (request: ValidateEmailRequest) => {
    try {
        const response = await axiosInstance.post("/auth/validate-email", request);
        return response.data;
    } catch (error) {
        return isAxiosError(error);
    }
}

export const joinwaitListRequestAsync = async (request: ValidateEmailRequest) => {
    try {
        const response = await axiosInstance.post("/auth/join-waitlist", request);
        return response.data;
    } catch (error) {
        return isAxiosError(error);
    }
}

export const resendEmailVerificationRequestAsync = async (request: ValidateEmailRequest) => {
    try {
        const response = await axiosInstance.post("/auth/resend-verification-email", request);
        return response.data;
    } catch (error) {
        return isAxiosError(error);
    }
}