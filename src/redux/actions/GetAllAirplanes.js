import NetworkAdapter from "../../api/NetworkAdapter";
import {SET_ALL_AIRPLANES} from "../reducers/AirplanesReducer";

export const GetAllAirplanes = () => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		const result = await NETWORK_ADAPTER.get('/MRT/get-all-airplanes');
		if (result.code === 200) {
			return dispatch(
				{
					type: SET_ALL_AIRPLANES,
					payload: [...result.payload]
				}
			)
		}
		console.log(result.message)
		return null;
	};
}