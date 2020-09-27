/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
export const INITIALISE_APP = 'INITIALISE_APP';
export const SET_IS_MOBILE = 'SET_IS_MOBILE';
export const APP_SET_THEME = 'APP_SET_THEME';
export const SET_SIDE_MENU = 'SET_SIDE_MENU';
export function setIsMobile() {
  return {
    type: SET_IS_MOBILE,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    isMobile: (window.innerWidth < 800)
  }
}
export function setTheme(theme) {
  return {
    type: APP_SET_THEME,
    theme: theme,
  }
}
export function setSideMenu(defaultOpenKeys, defaultSelectedKeys) {
  return {
    type: SET_SIDE_MENU,
    defaultOpenKeys: defaultOpenKeys,
    defaultSelectedKeys: defaultSelectedKeys
  }
}