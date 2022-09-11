import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {UsersReducer} from "../reducers/UsersReducer";
import thunk from "redux-thunk";
import {AirplanesReducer} from "../reducers/AirplanesReducer";
import {ToolsReducer} from "../reducers/ToolsReducer";
import {ToolRequestsReducer} from "../reducers/ToolRequestsReducer";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
	combineReducers(
		{
			UsersReducer,
			AirplanesReducer,
			ToolsReducer,
			ToolRequestsReducer
		}
	),
	storeEnhancers(
		applyMiddleware(
			thunk
		)
	)
);

export default Store;