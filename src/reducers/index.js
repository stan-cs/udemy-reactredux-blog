import { combineReducers } from 'redux';

import postReducer from './postReducer';
import usersReducer from './userReducer';

export default combineReducers({
    posts: postReducer,
    users: usersReducer
});