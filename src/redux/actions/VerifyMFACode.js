import NetworkAdapter from "../../api/NetworkAdapter";

export const VerifyMFACode = (email, code) => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		return await NETWORK_ADAPTER.post('/MRT/verify-mfa-code', {email, code});
	};
}
