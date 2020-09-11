/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { wagoReducer } from './wagoReducer';

const rootReducer = combineReducers({
    appReducer,
    wagoReducer
})

export default rootReducer;