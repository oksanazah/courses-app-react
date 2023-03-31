import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

export { store, RootState, useAppDispatch };
