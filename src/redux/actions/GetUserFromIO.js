import NetworkAdapter from "../../api/NetworkAdapter";

const NETWORK_ADAPTER = new NetworkAdapter();

export const GetUserFromIO = (id) => {
	return async (dispatch) => {
		return await NETWORK_ADAPTER.get('/users/get-user/' + id);
	};
}