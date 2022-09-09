import NetworkAdapter from "../../api/NetworkAdapter";

const NETWORK_ADAPTER = new NetworkAdapter();

export const GetAllRevisions = (id) => {
	return async (dispatch) => {
		return await NETWORK_ADAPTER.get('/documents/all-revisions/' + id);
	};
}