import {LOCAL_ADDRESS} from "../../config/Network";

export const SignUserOut = async (instance) => {
	try {
		const accounts = instance.getAllAccounts();

		if (!accounts || accounts.length < 1) {
			return null;
		}
		const logoutRequest = {
			account: instance.getAccountByHomeId(accounts[0]),
			mainWindowRedirectUri: LOCAL_ADDRESS,
			postLogoutRedirectUri: "/"
		}
		const res = await instance.logoutPopup(logoutRequest);
		console.log(res);
		return res;
	} catch (e) {
		console.log(`ERROR: ${e.message}`);
		return null;
	}
}

export default SignUserOut;