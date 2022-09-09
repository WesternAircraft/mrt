import styles from './NavigationBar.module.sass';
import {connect} from "react-redux";
import SignOut from "../../modals/SignOut/SignOut";
import {useState} from "react";

const NavigationBar = (props) => {

	const [ShowSignOut, SetShowSignOut] = useState(false);

	return <div className={styles.navigationBar}>
		<div className={styles.left}>
		</div>
		<div className={styles.center}>
		</div>
		<div className={styles.right}>
			<div className={styles.name}>
				Welcome, {props.UsersReducer.AuthedUser.name}
			</div>
			<i
				className="fa-regular fa-arrow-right-from-bracket"
				onClick={() => SetShowSignOut(true)}
			/>
		</div>
		<SignOut show={ShowSignOut} handleClose={() => SetShowSignOut(false)}/>
	</div>
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps, null)(NavigationBar);