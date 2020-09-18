/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import { INITIALISE_APP, SET_IS_MOBILE, APP_SET_THEME, SET_SIDE_MENU } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
    isMobile: false,
    innerWidth: null,
    theme: 'light'
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INITIALISE_APP:
            return state
        case SET_IS_MOBILE:
            return {
                ...state,
                innerWidth: action.innerWidth,
                innerHeight: action.innerHeight,
                isMobile: action.isMobile
            }
        case APP_SET_THEME:
            return {
                ...state,
                theme: action.theme,
            }
        case SET_SIDE_MENU:
            return {
                ...state,
                defaultOpenKeys: action.defaultOpenKeys,
                defaultSelectedKeys: action.defaultSelectedKeys
            }
        default:
            return state
    }
}