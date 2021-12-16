import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#EA5B25',
  colorSecondary: '#EA5B25',

  // UI
  appBg: '#CDE6F7',
  appContentBg: 'white',
  appBorderColor: '#d0d0d0',
  appBorderRadius: 4,

  // Typography
  fontBase: 'proxima-n-w01-reg, Helvetica, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#4a4a49',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#e0e0e0',
  barSelectedColor: 'white',
  barBg: '#2cb0c7',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'ReDI Design System',
  brandUrl: 'https://www.redi-school.org/',
  brandImage: 'https://static.wixstatic.com/media/206b5b_5b3955c03ad0488cb12b21964327e188~mv2.png/v1/crop/x_11,y_0,w_3978,h_800/fill/w_156,h_30,al_c,q_85,usm_0.66_1.00_0.01/HorizontalReDISchool.webp'
});