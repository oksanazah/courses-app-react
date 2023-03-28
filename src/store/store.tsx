import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

const store = createStore(rootReducer, composeWithDevTools());
type RootState = ReturnType<typeof store.getState>;

export { store, RootState };
