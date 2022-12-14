export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const SIGN_USER_OUT = "SIGN_USER_OUT";

const initialState = {
	AuthedUser: null
}

export const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTHED_USER:
			return {
				...state,
				AuthedUser: action.payload
			}
		case SIGN_USER_OUT:
			return {
				...state,
				AuthedUser: null
			}
		default:
			return {...state}
	}
}