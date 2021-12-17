import { addons } from '@storybook/addons';
import ReDITheme from './theme';

/** 
 * @see https://storybook.js.org/docs/vue/configure/features-and-behavior
 * */
addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  enableShortcuts: true,
  isToolshown: true,
  theme: ReDITheme,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: [],
  },
  toolbar: {
    addons: { hidden: false },
    title: { hidden: false },
    zoom: { hidden: true },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  }
});