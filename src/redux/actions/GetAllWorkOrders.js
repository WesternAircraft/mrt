import NetworkAdapter from "../../api/NetworkAdapter";
import {SET_ALL_WORK_ORDERS} from "../reducers/WorkOrdersReducer";

export const GetAllWorkOrders = () => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		const result = await NETWORK_ADAPTER.get('/MRT/get-all-work-orders');
		if (result.code === 200) {
			return dispatch(
				{
					type: SET_ALL_WORK_ORDERS,
					payload: [...result.payload]
				}
			)
		}
		console.log(result.message)
		return null;
	};
}