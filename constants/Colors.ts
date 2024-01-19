// const tintColorLight = "#2f95dc";
// const tintColorDark = "#fff";

const whiteColor = "#fff";
const lightColor = "#F8FAFC";
const darkColor = "#0F172A";
const accent = "#FF9F29";
const error = "#FD6A6A";

export default {
  light: {
    text: {
      main: darkColor,
      light: "#94A3B8",
    },

    button: {
      textMain: whiteColor,
      main: darkColor,
    },

    indicator: {
      main: darkColor,
      secondary: "#CBD5E1",
    },

    background: {
      main: whiteColor,
      secondary: whiteColor,
    },

    border: "#E2E8F0",
    placeholder: "#CBD5E1",
    accent,
    error,
    white: whiteColor,

    // tint: tintColorLight,
    // tabIconDefault: "#ccc",
    // tabIconSelected: tintColorLight,
  },

  dark: {
    text: {
      main: lightColor,
      light: "#64748B",
    },

    button: {
      textMain: darkColor,
      main: whiteColor,
    },

    indicator: {
      main: whiteColor,
      secondary: "#475569",
    },

    background: {
      main: darkColor,
      secondary: "#1B2537",
    },

    border: "#2A3646",
    placeholder: "#64748B",
    accent,
    error,
    white: whiteColor,

    // tint: tintColorDark,
    // tabIconDefault: "#ccc",
    // tabIconSelected: tintColorDark,
  },
};
