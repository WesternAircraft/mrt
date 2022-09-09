import styles from './Unauthorized.module.sass';
import {useMsal} from "@azure/msal-react";
import {GetUserFromIO} from "../../redux/actions/GetUserFromIO";
import {connect} from "react-redux";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import SignUserOut from "../../utils/functions/SignUserOut";
import {ForceUserOut} from "../../redux/actions/ForceUserOut";


const UnAuthorized = (props) => {

	const {
		instance
	} = useMsal();

	const SignOut = async () => {
		props.ForceUserOut();
		const res = await SignUserOut(instance);
		localStorage.removeItem('beacon_user')
		console.log(res);
	}

	return <div className={styles.unauthorized}>
		<div className={styles.message}>
			<i className="fa-light fa-sensor-triangle-exclamation"/>
			<div className={styles.title}>WAI Restricted Area</div>
			<div className={styles.description}>Western Aircraft has restricted access to this site. If you have been
				given permission to acess this area, please log in below.
			</div>
			<ButtonBar position={'center'}>
				<Button color={'#F5B041'} handleClick={() => SignOut()} long>Sign Out</Button>
			</ButtonBar>
			<div className={styles.error}>Login Failed: User is not authorized.</div>
		</div>
	</div>
}

const mapDispatchToProps = (dispatch) => {
	return {
		GetUserFromIO: (id) => dispatch(GetUserFromIO(id)),
		ForceUserOut: () => dispatch(ForceUserOut())
	};
};

export default connect(null, mapDispatchToProps)(UnAuthorized);