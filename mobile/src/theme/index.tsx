import { extendTheme } from "native-base";
const newColorTheme = {
  bg: {
    50: "#FFFFFF",
  },
  primary: {
    50: "#4ABC96",
    100: "#C5E4F3",
    200: "#A2D4EC",
    500: "#333333",
    600: "#4ABC96"
  },
};

const fontConfig = {
  Poppins: {
    100: {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    200: {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    300: {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    400: {
      normal: "Poppins-Regular",
      italic: "Poppins-Italic",
    },
    500: {
      normal: "Poppins-Medium",
      italic: "Poppins-MediumItalic",
    },
    600: {
      normal: "Poppins-Medium",
      italic: "Poppins-MediumItalic",
    },
    700: {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
    800: {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
    900: {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
  },
};


const theme = extendTheme({
  colors: newColorTheme,
  fontConfig: fontConfig,
  components: {
    Input: {
      variants: {
        underlined: {
          borderBottomWidth: 2,
          borderColor: newColorTheme.primary[500]
        },
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default theme;
