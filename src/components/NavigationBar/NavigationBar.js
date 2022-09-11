import styles from './NavigationBar.module.sass';
import {connect} from "react-redux";
import {useMsal} from "@azure/msal-react";
import SignUserOut from "../../utils/functions/SignUserOut";
import {ForceUserOut} from "../../redux/actions/ForceUserOut";
import WAI_LOGO from '../../assets/logos/western_aircraft_3.png';
import {Link} from "react-router-dom";

const NavigationBar = (props) => {

	const {
		instance
	} = useMsal();

	const SignOut = async () => {
		props.ForceUserOut();
		const res = await SignUserOut(instance);
		localStorage.removeItem('beacon_user');
		console.log(res);
	}

	return <div className={styles.navigationBar}>
		<div className={styles.left}>
			<img src={WAI_LOGO} alt=""/>
		</div>
		<div className={styles.center}>
			<Link to={'/'}>
				<div className={styles.item}>Dashboard</div>
			</Link>
			<Link to={'/airplanes'}>
				<div className={styles.item}>Airplanes</div>
			</Link>
			<Link to={'/tooling'}>
				<div className={styles.item}>Tooling</div>
			</Link>
		</div>
		<div className={styles.right}>
			<div className={styles.name}>
				Welcome, {props.UsersReducer.AuthedUser.name}
			</div>
			<i
				className="fa-regular fa-arrow-right-from-bracket"
				onClick={() => SignOut()}
			/>
		</div>
	</div>
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		ForceUserOut: () => dispatch(ForceUserOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);