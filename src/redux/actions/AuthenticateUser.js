import NetworkAdapter from "../../api/NetworkAdapter";

const NETWORK_ADAPTER = new NetworkAdapter();

export const AuthenticateUser = (data) => {
	return async (dispatch) => {
		return await NETWORK_ADAPTER.post('/msal/authenticate', {...data});
	};
}