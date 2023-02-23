import styles from './NavigationBar.module.sass';
import {connect} from "react-redux";
import {ForceUserOut} from "../../redux/actions/ForceUserOut";
import WAI_LOGO from '../../assets/logos/western_aircraft_3.png';
import {Link} from "react-router-dom";
import SignOut from "../../modals/SignOut/SignOut";
import {useState} from "react";

const NavigationBar = (props) => {

	const [SignOutModal, SetSignOutModal] = useState(false);

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
			<Link to={'/documents'}>
				<div className={styles.item}>Documents</div>
			</Link>
			<Link to={'/tooling'}>
				<div className={styles.item}>Tooling</div>
			</Link>
			<Link to={'/users'}>
				<div className={styles.item}>Users</div>
			</Link>
		</div>
		<div className={styles.right}>
			<div className={styles.name}>
				Welcome, {props.UsersReducer.AuthedUser.name}
			</div>
			<i
				className="fa-regular fa-arrow-right-from-bracket"
				onClick={() => SetSignOutModal(true)}
			/>
		</div>
		<SignOut show={SignOutModal} handleClose={() => SetSignOutModal(false)}/>
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
