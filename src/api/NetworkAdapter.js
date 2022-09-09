import axios from "axios";
import {NETWORK_ADDRESS} from "../config/Network";

class NetworkAdapter {

	get = async (address) => {
		try {
			const {data} = await axios.get(NETWORK_ADDRESS + "/api" + address);
			return data;
		} catch (e) {
			return {
				code: 500,
				message: e.message,
				payload: []
			};
		}
	};

	post = async (address, payload) => {
		try {
			const {data} = await axios.post(NETWORK_ADDRESS + "/api" + address, {
				...payload
			});
			return data;
		} catch (e) {
			return {
				code: 500,
				message: e.message,
				payload: []
			};
		}
	};

}

export default NetworkAdapter;