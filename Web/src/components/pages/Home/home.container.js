/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
*/
import { connect } from 'react-redux';
import Home from './home';

const mapStateToProps = state => ({
    theme: state.app.theme,
});

// Wrap with the router and wrap the dispatch method
const mapDispatchToProps = dispatch => ({
});

export default (connect(mapStateToProps, mapDispatchToProps)(Home));
