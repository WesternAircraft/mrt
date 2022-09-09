import {Scopes} from "../../config/MSALConfig";
import GetCurrentUserFromAD from "./GetCurrentUserFromAD";

export const ReAuthorizeUser = async (instance) => {
	try {
		console.log("Looking for an existing logged in user")
		// Look for a Existing Sign in Token
		let tokenResponse = await instance.handleRedirectPromise();
		let accountObj;
		if (tokenResponse) {
			console.log("Found a user from a token");
			accountObj = tokenResponse.account;
		} else {
			console.log("No Token found. Looking for previously signed in users")
			accountObj = instance.getAllAccounts()[0];
		}
		if (!accountObj) {
			console.log("No token or previously signed in users found")
			return null;
		}

		console.log("Attempting to grab Access token using account object")
		// If Token is found, attempt to authenticate
		const tokenAcquisition = await instance.acquireTokenSilent({
			account: accountObj,
			scopes: Scopes
		});
		if (!tokenAcquisition || !tokenAcquisition.accessToken) {
			console.log("No Token Acquired.")
			return null;
		}
		console.log("Using the token to get account information");
		const userResult = await GetCurrentUserFromAD(tokenAcquisition.accessToken);
		if (!userResult) {
			console.log("Could not get account information")
			return null;
		}
		console.log("Got account information from AD")
		return {
			id: userResult.id,
			accessToken: tokenAcquisition.accessToken
		};
	} catch (e) {
		console.log(`ERROR: ${e.message}`);
		return null;
	}
};

export default ReAuthorizeUser;