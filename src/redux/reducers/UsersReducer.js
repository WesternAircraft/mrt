export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const SIGN_USER_OUT = "SIGN_USER_OUT";
export const SET_TEAM_MEMBERS = "SET_TEAM_MEMBERS";

const initialState = {
	AuthedUser: null,
	TeamMembers: []
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
		case SET_TEAM_MEMBERS:
			return {
				...state,
				TeamMembers: action.payload
			}
		default:
			return {...state}
	}
}
