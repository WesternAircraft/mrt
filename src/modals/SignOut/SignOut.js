import styles from './SignOut.module.sass';
import Modal from "../../wrappers/Modal/Modal";
import PropTypes from "prop-types";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import SIGN_USER_OUT from '../../utils/functions/SignUserOut';
import {useMsal} from "@azure/msal-react";
import {connect} from "react-redux";
import {SignUserOut} from "../../redux/actions/SignUserOut";

const SignOut = (props) => {

	const {
		instance
	} = useMsal();

	const SignOut = async () => {
		await SIGN_USER_OUT(instance);
		await props.SignUserOut();
	}

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.signOut}>
			SIGN OUT MODAL
		</div>
		<ButtonBar position={'right'}>
			<Button color={'#EC7063'} handleClick={props.handleClose}>No</Button>
			<Button color={'#58D68D'} long handleClick={() => SignOut()}>Yes</Button>
		</ButtonBar>
	</Modal>
}

SignOut.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
	return {
		SignUserOut: () => dispatch(SignUserOut()),
	};
};

export default connect(null, mapDispatchToProps)(SignOut);