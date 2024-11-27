export interface IbaseTheme {
  colors: {
    white: string;
    dark_blue: string;
    dark: string;
    light: string;
    green: string;
    light_grey: string;
    dark_grey: string;
    dark_green: string;
    black: string;
  };

  sizes: {
    desctop: number;
    mobile: number;
    shirt_dectop: number;
    height: number;
    base_radius: number;
  };

  border: {
    grey: string;
    red: string;
    blue: string;
  };

  padding: {
    header: string;
    body: string;
    footer: string;
    button: string;
  };

  order: {
    header: number;
    modal: number;
  };
}
