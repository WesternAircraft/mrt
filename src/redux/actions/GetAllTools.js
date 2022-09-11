import NetworkAdapter from "../../api/NetworkAdapter";
import {SET_ALL_TOOLS} from "../reducers/ToolsReducer";

export const GetAllTools = () => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		const result = await NETWORK_ADAPTER.get('/MRT/get-all-tools');
		if (result.code === 200) {
			return dispatch(
				{
					type: SET_ALL_TOOLS,
					payload: [...result.payload]
				}
			)
		}
		console.log(result.message)
		return null;
	};
}