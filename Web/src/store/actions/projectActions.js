/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
export const GET_PROJECT_LIST = 'GET_PROJECT_LIST';
export const GET_PROJECT_LIST_RESULT = 'GET_PROJECT_LIST_RESULT';
export const PROJECT_ERROR = 'PROJECT_ERROR';

const obj = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
    },
    body: null
};

function getAction(type) {
    return {
        type: type
    }
}
function displayError(errorMessage) {
    return {
        type: PROJECT_ERROR,
        errorMessage
    }
}
function fetchData(dispatch, url, resultCallback, errorCallback) {
    return fetch(url, obj)
        .then(response => response.json())
        .then(function (resJson) {
            console.log("resJson", resJson);
            dispatch(resultCallback(resJson));
            //return resJson['value'];
        })
        .catch(err => {
            err.text().then(errorMessage => {
                //console.log("errorMessage", errorMessage);
                dispatch(errorCallback(errorMessage))
            })
        });
}

function getDataSuccess(data) {
    console.log("data", data);
    return {
        type: GET_PROJECT_LIST_RESULT,
        data: data
    }
}
export function getProjectList() {
    return dispatch => {
        dispatch(getAction(GET_PROJECT_LIST));
        return fetchData(dispatch, 'http://api.additivasia.io/api/v1/assignment/employees', getDataSuccess, displayError);
    };
}

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_RESULT = 'ADD_PROJECT_RESULT';
function addProjectSuccess(data) {
    return {
        type: ADD_PROJECT_RESULT,
        data: data
    }
}
export function addProjectRecord() {
    return dispatch => {
        dispatch(getAction(ADD_PROJECT));
        return fetchData(dispatch, 'http://api.additivasia.io/api/v1/assignment/employees', addProjectSuccess, displayError);
    };
}