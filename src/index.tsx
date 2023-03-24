import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';

import App from './App';
import { store } from './App';

const root: ReactDOM.Root = ReactDOM.createRoot(
	document.getElementById('root') as Element
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
