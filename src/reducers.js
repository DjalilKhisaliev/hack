import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

const initialAppState = {
    appName: 'example',
    loaded: false
};

const reducers = combineReducers({
    app: handleActions({}, initialAppState),
    routing: routerReducer
});

export default reducers;
