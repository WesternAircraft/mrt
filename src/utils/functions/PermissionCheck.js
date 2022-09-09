const PermissionCheck = (permissions, allowed) => {
	let temp = false;
	allowed.forEach((p) => {
		if (permissions.includes(p)) {
			temp = true;
		}
	})
	return temp;
}

export default PermissionCheck;