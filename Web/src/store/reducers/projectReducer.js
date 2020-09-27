/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    projectList: [],
    errorMessage: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PROJECT_LIST:
            return {
                ...state,
                isFetching: true,
                projectList: []
            }
        case actionTypes.GET_PROJECT_LIST_RESULT:
            return {
                ...state,
                isFetching: false,
                projectList: action.data,
            }
        case actionTypes.PROJECT_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}