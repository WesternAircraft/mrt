export const SET_ALL_WORK_ORDERS = "GET_ALL_WORK_ORDERS";

const initialState = {
	WorkOrders: []
}

export const WorkOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_WORK_ORDERS:
			return {
				...state,
				WorkOrders: [...action.payload]
			}
		default:
			return {...state}
	}
}