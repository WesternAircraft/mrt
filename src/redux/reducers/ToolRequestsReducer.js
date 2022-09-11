export const SET_ALL_TOOL_REQUESTS = "SET_ALL_TOOL_REQUESTS";

const initialState = {
	ToolRequests: []
}

export const ToolRequestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_TOOL_REQUESTS:
			return {
				...state,
				ToolRequests: [...action.payload]
			}
		default:
			return {...state}
	}
}