import {LoginPermissionRequest} from "../../config/MSALConfig";
import GetCurrentUserFromAD from "./GetCurrentUserFromAD";

export const SignUserIn = async (instance) => {
	try {
		console.log("Launching Pop Up")
		const {accessToken} = await instance.loginPopup(LoginPermissionRequest);
		if (!accessToken) {
			console.log("Could not get access token from sign in")
			return null;
		}
		console.log("Access token granted! Getting User from AD");
		const userResult = await GetCurrentUserFromAD(accessToken);
		if (!userResult) {
			console.log("Could not get user from AD.")
			return null;
		}
		console.log("Found User in AD")
		return {
			id: userResult.id,
			accessToken: accessToken
		};
	} catch (e) {
		console.log(`ERROR: ${e.message}`);
		return null;
	}
};

export default SignUserIn;