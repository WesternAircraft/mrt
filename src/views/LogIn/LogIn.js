import styles from './LogIn.module.sass';
import {useMsal} from "@azure/msal-react";
import {GetUserFromIO} from "../../redux/actions/GetUserFromIO";
import {SetAuthedUser} from "../../redux/actions/SetAuthedUser";
import {connect} from "react-redux";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import SignUserIn from "../../utils/functions/SignUserIn";
import {LOCAL_ADDRESS} from "../../config/Network";
import PermissionCheck from "../../utils/functions/PermissionCheck";
import {ForceUserOut} from "../../redux/actions/ForceUserOut";

const LogIn = (props) => {

	const {
		instance
	} = useMsal();

	const Authenticate = async () => {
		const authResult = await SignUserIn(instance);
		if (authResult) {
			const result = await props.GetUserFromIO(authResult.id);
			if (result.code === 200) {
				if (PermissionCheck(result.payload.permissions, ['MRT_FULL_ADMIN', "MRT_READ_ONLY"])) {
					console.log("Authorized!!!!!")
					localStorage.setItem('beacon_user', result.payload._id);
					props.SetAuthedUser({...result.payload})
				} else {
					window.location = LOCAL_ADDRESS + '/unauthorized';
					props.ForceUserOut(null);
					console.log("UN-AUTHORIZED!!!!!")
				}
			}
		}
	}

	return <div className={styles.login}>
		<div className={styles.message}>
			<i className="fa-light fa-sensor-triangle-exclamation"/>
			<div className={styles.title}>WAI Restricted Area</div>
			<div className={styles.description}>Western Aircraft has restricted access to this site. If you have been
				given permission to acess this area, please log in below.
			</div>
			<ButtonBar position={'center'}>
				<Button color={'#5499C7'} handleClick={() => Authenticate()} long>Login</Button>
			</ButtonBar>
		</div>
	</div>
}

const mapDispatchToProps = (dispatch) => {
	return {
		GetUserFromIO: (id) => dispatch(GetUserFromIO(id)),
		SetAuthedUser: (user) => dispatch(SetAuthedUser(user)),
		ForceUserOut: () => dispatch(ForceUserOut()),
	};
};

export default connect(null, mapDispatchToProps)(LogIn);