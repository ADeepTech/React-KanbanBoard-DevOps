/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { filterActions, ignoreActions } from 'redux-ignore'; // pull in the filterActions function
import appReducer from './reducers/appReducer';
import projectReducer from './reducers/projectReducer';
import * as actions from './actions/actionTypes';

export default function configureStore(initialState) {
    const middewares = [
        // Add other middleware on this line...
        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunkMiddleware,
    ];
    /*if (process.env.NODE_ENV === `development`) {
        const { logger } = require(`redux-logger`);
        middewares.push(logger);
    }*/
    return createStore(
        combineReducers({
            app: filterActions(appReducer, []),
            project: projectReducer
        }), initialState, compose(
            applyMiddleware(...middewares)
        )
    );
}