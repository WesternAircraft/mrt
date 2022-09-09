import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {UsersReducer} from "../reducers/UsersReducer";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
	combineReducers(
		{
			UsersReducer,
		}
	),
	storeEnhancers(
		applyMiddleware(
			thunk
		)
	)
);

export default Store;