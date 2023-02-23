import NetworkAdapter from "../../api/NetworkAdapter";
import {SET_TEAM_MEMBERS} from "../reducers/UsersReducer";

export const GetTeamMembers = () => {
	return async (dispatch) => {
		const NETWORK_ADAPTER = new NetworkAdapter();
		const result = await NETWORK_ADAPTER.get('/MRT/get-team-members');
		if (result.code === 200) {
			return dispatch(
				{
					type: SET_TEAM_MEMBERS,
					payload: [...result.payload]
				}
			)
		}
		console.log(result.message)
		return null;
	};
}
