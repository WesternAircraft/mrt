import NetworkAdapter from "../../api/NetworkAdapter";
import {SET_ALL_TOOL_REQUESTS} from "../reducers/ToolRequestsReducer";

export const GetAllToolRequests = () => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		const result = await NETWORK_ADAPTER.get('/MRT/get-tool-requests');
		if (result.code === 200) {
			return dispatch(
				{
					type: SET_ALL_TOOL_REQUESTS,
					payload: [...result.payload]
				}
			)
		}
		console.log(result.message)
		return null;
	};
}