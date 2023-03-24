import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';

export default combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});
