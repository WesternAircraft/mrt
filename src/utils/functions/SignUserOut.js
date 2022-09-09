export const SignUserOut = async (instance) => {
	try {
		const accounts = instance.getAllAccounts();

		if (!accounts || accounts.length < 1) {
			return null;
		}
		const logoutRequest = {
			account: instance.getAccountByHomeId(accounts[0]),
			mainWindowRedirectUri: 'https://avionics.westair.com/#/logged-out',
			postLogoutRedirectUri: "/"
		}
		instance.logoutPopup(logoutRequest);
	} catch (e) {
		console.log(`ERROR: ${e.message}`);
		return null;
	}
}

export default SignUserOut;