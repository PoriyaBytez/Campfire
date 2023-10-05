/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Box, ColorMode, NativeBaseProvider, StorageManager } from "native-base";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import "~translations/i18n";
import { withTranslation } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import PublicNavigator from "~navigators/PublicNavigator";
import store from "~redux/store";
import theme from "~theme/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mixpanel } from 'mixpanel-react-native';
import { LogBox, YellowBox } from "react-native";
 
const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel("1c125853c0fda38af06b8c15319ea772", trackAutomaticEvents);
mixpanel.init();
 
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@theme-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("@theme-mode", value!!);
      } catch (e) {
        console.log(e);
      }
    },
  };

  const config = {
    dependencies: {
      "linear-gradient": require("react-native-linear-gradient").default,
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ReduxProvider store={store}>
        <NativeBaseProvider
          isSSR={false}
          config={config}
          theme={theme}
          colorModeManager={colorModeManager}
        >
            <NavigationContainer>
              <PublicNavigator />
            </NavigationContainer>
        
        </NativeBaseProvider>
      </ReduxProvider>
    </SafeAreaView>
  );
}

export default withTranslation()(App);
