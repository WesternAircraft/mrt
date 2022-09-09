import {SIGN_USER_OUT} from "../reducers/UsersReducer";

export const ForceUserOut = () => {
	return async (dispatch) => {
		return dispatch(
			{
				type: SIGN_USER_OUT,
				payload: null
			}
		)
	};
}