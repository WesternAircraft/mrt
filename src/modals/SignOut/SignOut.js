import styles from './SignOut.module.sass';
import Modal from "../../wrappers/Modal/Modal";
import PropTypes from "prop-types";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {connect} from "react-redux";
import SignUserOut from "../../utils/functions/SignUserOut";

const SignOut = (props) => {

	const SignUserOut = () => {
		localStorage.removeItem("mrt_io_auth_token");
		window.location.reload();
	}

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.title}>Sign Out?</div>
		<ButtonBar position={'center'}>
			<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
			<Button color={'#7DCEA0'} handleClick={() => SignUserOut()} long>Sign Out</Button>
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
