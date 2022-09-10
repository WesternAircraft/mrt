export const SET_ALL_AIRPLANES = "GET_ALL_AIRPLANES";

const initialState = {
	Airplanes: []
}

export const AirplanesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_AIRPLANES:
			return {
				...state,
				Airplanes: [...action.payload]
			}
		default:
			return {...state}
	}
}