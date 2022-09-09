import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";
import {MSALConfig} from "./config/MSALConfig";
import {Provider} from "react-redux";
import Store from './redux/stores/Store';

const msalInstance = new PublicClientApplication(MSALConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={Store}>
		<MsalProvider instance={msalInstance}>
			<App/>
		</MsalProvider>
	</Provider>,
);

reportWebVitals();
