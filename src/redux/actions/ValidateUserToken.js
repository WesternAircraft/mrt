import NetworkAdapter from "../../api/NetworkAdapter";

export const ValidateUserToken = (token) => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		return await NETWORK_ADAPTER.post('/MRT/validate-user-token', {token});
	};
}
