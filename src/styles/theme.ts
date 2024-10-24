import { IbaseTheme } from "./IbaseTheme";

export const baseTheme: IbaseTheme = {
  colors: {
    white: "#ffffff",
    dark_blue: "#344966",
    dark: "#0D1821",
    light: "#F0F4EF",
    green: "#BFCC94",
    light_grey: "",
    dark_grey: "#B9BAC3",
    dark_green: "#8D9F4F",
    black: "#000000",
  },
  // in px
  sizes: {
    desctop: 550,
    mobile: 260,
    shirt_dectop: 505,
    height: 50,
    base_radius: 16,
  },

  border: {
    grey: "1px solid #f5f5f5",
    red: "1px solid #b83f45",
  },

  padding: {
    header: "24px 80px",
    body: "24px",
    footer: "73px 80px",
    button: "10px 50px",
  },

  order: {
    header: 50,
    modal: 50,
  },
};
