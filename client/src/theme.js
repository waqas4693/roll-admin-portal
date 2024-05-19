const lightPrimaryColor = "#6610f2";
const lightSecondaryColor = "#87CEEB";
const lightGreyColor = "#F5F5F5";
const lightWhiteColor = "#F8F8FF";
const whiteColor = "#FFFFFF";

const darkPrimaryColor = "#6610f2";
const darkSecondaryColor = "#87CEEB";
const darkGreyColor = "#212121";
const lightBlackColor = "#0D0907";
const blackColor = "#000000";

const sideBarColor = "#87CEEB";


export const tokensDark = {
  grey: {
    0: "#F5F5F5",
    10: "#EEEEEE",
    50: "#BDBDBD",
    100: "#9E9E9E",
    200: "#757575",
    300: "#616161",
    400: "#424242",
    500: "#212121",
    600: "#212121",
    700: "#212121",
    800: "#212121",
    900: "#212121",
  },
  primary: {
    100: "#C5CAE9",
    200: "#9FA8DA",
    300: "#7986CB",
    400: "#5C6BC0",
    500: "#3F51B5",
    600: "#3949AB",
    700: "#303F9F",
    800: "#283593",
    900: "#1A237E",
  },
  secondary: {
    50: "#FCE4EC",
    100: "#F8BBD0",
    200: "#F48FB1",
    300: "#F06292",
    400: "#EC407A",
    500: "#E91E63",
    600: "#D81B60",
    700: "#C2185B",
    800: "#AD1457",
    900: "#880E4F",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              
              main: darkPrimaryColor
              // light: tokensDark.primary[400],
            },
            secondary: {
              main: darkSecondaryColor
            },
            neutral: {
              // ...tokensDark.grey,
              main: darkGreyColor
            },
            background: {
              default: darkGreyColor,
              normal: lightBlackColor,
              alt: blackColor
            },
          }
        : {
            // palette values for light mode
            primary: {
              // ...tokensLight.primary,
              main: lightPrimaryColor
              // light: tokensDark.grey[100],
            },
            secondary: {
              // ...tokensLight.secondary,
              main: lightSecondaryColor
              // light: tokensDark.secondary[700],
            },
            neutral: {
              // ...tokensLight.grey,
              main: lightGreyColor
            },
            background: {
              default: lightGreyColor,
              normal: lightWhiteColor,
              alt: whiteColor,
              special: sideBarColor
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
