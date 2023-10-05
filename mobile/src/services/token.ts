import AsyncStorage from "@react-native-async-storage/async-storage";
import { TokenData } from "./types";

export const getLocalRefreshToken = async (): Promise<string | null> => {
  const tokenData: string | null = await AsyncStorage.getItem("token");
  if (tokenData === null) return null;

  const token: TokenData = JSON.parse(tokenData);
  return token.refreshToken;
};

export const getLocalAccessToken = async () => {
  const tokenData: string | null = await AsyncStorage.getItem("token");
  if (tokenData === null) return null;

  const token: TokenData = JSON.parse(tokenData);
  return token.accessToken;
};

export const updateAccessToken = async (accessToken: string, refreshToken: string) => {
  const tokenData: string | null = await AsyncStorage.getItem("token");
  if (tokenData === null) return null;

  const token: TokenData = JSON.parse(tokenData);
  if (token) {
    await AsyncStorage.setItem("token", JSON.stringify({ ...token, accessToken, refreshToken }));
  }
};

export const removeToken = () => {
  AsyncStorage.removeItem("token");
};
