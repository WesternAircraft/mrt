export const SET_ALL_TOOLS = "GET_ALL_TOOLS";

const initialState = {
	Tools: []
}

export const ToolsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_TOOLS:
			return {
				...state,
				Tools: [...action.payload]
			}
		default:
			return {...state}
	}
}