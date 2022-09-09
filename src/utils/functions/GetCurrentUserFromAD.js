import {GraphMeConfig} from '../../config/MSALConfig';

const GetCurrentUserFromAD = async (accessToken) => {
	try {
		const headers = new Headers();
		const bearer = `Bearer ${accessToken}`;
		headers.append('Authorization', bearer);
		try {
			const userResult = await fetch(GraphMeConfig.graphMeEndpoint + '/me',
				{
					method: 'GET',
					headers: headers
				})
				.then(response => response.json())
				.catch(error => console.log(error));
			const permResult = await fetch(GraphMeConfig.graphMeEndpoint + '/me/transitiveMemberOf/microsoft.graph.group',
				{
					method: 'GET',
					headers: headers
				})
				.then(response => response.json())
				.catch(error => console.log(error));
			if (!userResult) return null;
			return userResult;
		} catch (e) {
			return null;
		}
	} catch (e) {
		return null;
	}
};

export default GetCurrentUserFromAD;