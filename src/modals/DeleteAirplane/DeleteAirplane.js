import styles from './DeleteAirplane.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const DeleteAirplane = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		const result = await NETWORK_ADAPTER.post('/MRT/delete-airplane', {
			_id: props.show,
			deleted_by: props.UsersReducer.AuthedUser._id
		});
		if (result.code !== 200) {
			SetErrors(result.message);
			return;
		}
		props.handleClose();
	}

	useEffect(() => {
		if (props.show) {
			SetErrors("");
		}
	}, [props.show]);

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.title}>Delte Airplane</div>
		<div className={styles.form}>
			<div className={styles.question}>
				Are you sure?
			</div>
			<div className={styles.explanation}>
				Deleting this airplane is a permanent action and cannot be undone.
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Delete Airplane</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

DeleteAirplane.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(DeleteAirplane);