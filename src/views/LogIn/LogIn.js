import styles from './LogIn.module.sass';
import AuthenticateViaAD from "../../utils/functions/AuthenticateViaAD";
import {useMsal} from "@azure/msal-react";
import {GetUserFromIO} from "../../redux/actions/GetUserFromIO";
import {SetAuthedUser} from "../../redux/actions/SetAuthedUser";
import {connect} from "react-redux";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";

const LogIn = (props) => {

	const {
		instance
	} = useMsal();

	const Authenticate = async () => {
		const authResult = await AuthenticateViaAD(instance);
		if (authResult) {
			const result = await props.GetUserFromIO(authResult.id);
			if (result.code === 200) {
				props.SetAuthedUser({...result.payload})
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
		SetAuthedUser: (user) => dispatch(SetAuthedUser(user))
	};
};

export default connect(null, mapDispatchToProps)(LogIn);