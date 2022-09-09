import NetworkAdapter from "../../api/NetworkAdapter";

const NETWORK_ADAPTER = new NetworkAdapter();

export const GetDocumentById = (id) => {
	return async (dispatch) => {
		return await NETWORK_ADAPTER.get('/documents/get-document/' + id);
	};
}