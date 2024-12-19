import { IbaseTheme } from './IbaseTheme';

export const baseTheme: IbaseTheme = {
  colors: {
    white: '#ffffff',
    dark_blue: '#344966',
    dark: '#0D1821',
    light: '#F0F4EF',
    green: '#BFCC94',
    light_grey: '#D6D8E7',
    dark_grey: '#B9BAC3',
    dark_green: '#8D9F4F',
    black: '#000000',
  },

  sizes: {
    desctop: 550,
    mobile: 260,
    shirt_dectop: 505,
    height: 50,
    base_radius: 16,
  },

  border: {
    grey: '1px solid #f5f5f5',
    red: '1px solid #b83f45',
    blue: '1px solid #344966',
    green: '2px solid #BFCC94',
  },

  padding: {
    base: '24px 80px',
    base_tablet: '26px 15px',
    body: '24px',
    footer: '73px 80px 73px 80px',
    button: '10px 50px',
  },

  order: {
    header: 50,
    modal: 50,
  },
};
