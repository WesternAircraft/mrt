import NetworkAdapter from "../../api/NetworkAdapter";

export const SendMFACode = (email) => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		return await NETWORK_ADAPTER.post('/MRT/send-mfa-code', {email});
	};
}
