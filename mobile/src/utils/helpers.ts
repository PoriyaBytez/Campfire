import { MixpanelProperties } from "mixpanel-react-native";
import { mixpanel } from "../../App";

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

let debounceTimer: NodeJS.Timeout;
export const debounceForFunc = (func: () => void, delayTime: number) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delayTime);
  };

export const trackEvent =  (eventName: string, trackData: MixpanelProperties) => {
mixpanel.track(eventName, trackData)
}