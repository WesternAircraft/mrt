import NetworkAdapter from "../../api/NetworkAdapter";

const NETWORK_ADAPTER = new NetworkAdapter();

export const UpdateDocument = (data) => {
	return async (dispatch) => {
		return await NETWORK_ADAPTER.post('/documents/update-document', {...data});
	};
}