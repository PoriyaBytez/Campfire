import { axiosInstance, isAxiosError } from "~services/api";

export const describesRequestAsync = async () => {
    try {
        const response = await axiosInstance.get("/masters/describe");
        return response.data;
    } catch (error) {
        return isAxiosError(error);
    }
}

export const countryRequestAsync = async () => {
    try {
        const response = await axiosInstance.get("/masters/country");
        return response.data;
    } catch (error) {
        return isAxiosError(error);
    }
}
export const characterRequestAsync = async () => {
    try {
        const response = await axiosInstance.get("/masters/character");
        return response.data;
    } catch (error) {
        return isAxiosError(error);
    }
}