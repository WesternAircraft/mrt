import {SET_AUTHED_USER} from "../reducers/UsersReducer";

export const SetAuthedUser = (User) => {
	return async (dispatch) => {
		return dispatch(
			{
				type: SET_AUTHED_USER,
				payload: {...User}
			}
		)
	};
}