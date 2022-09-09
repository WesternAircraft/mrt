import ReAuthorizeUser from "./ReAuthorizeUser";
import SignUserIn from "./SignUserIn";

const AuthenticateViaAD = async (instance) => {
	console.log("Running...")
	const reAuthResult = await ReAuthorizeUser(instance);
	if (!reAuthResult) {
		console.log("Attempts to re-authenticate user failed.")
		const signInResult = await SignUserIn(instance);
		if (!signInResult) {
			console.log("Error signing user in.")
			return true;
		}
		console.log("User successfully authenticated. Storing User.")
		localStorage.setItem('beacon_user', signInResult.id);
		return signInResult;
	}
	console.log("Re-Auth Successful. Storing User")
	localStorage.setItem('beacon_user', reAuthResult.id)
}

export default AuthenticateViaAD;