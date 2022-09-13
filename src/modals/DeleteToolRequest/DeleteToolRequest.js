import styles from './DeleteToolRequest.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const DeleteToolRequest = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		const result = await NETWORK_ADAPTER.post('/MRT/delete-tool-request', {
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

	return <Modal show={props.show && props.show !== ''} handleClose={props.handleClose}>
		<div className={styles.title}>Delete Tool Request</div>
		<div className={styles.form}>
			<div className={styles.question}>
				Are you sure?
			</div>
			<div className={styles.explanation}>
				Deleting this tool request is a permanent action and cannot be undone.
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Delete Tool Request</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

DeleteToolRequest.propTypes = {
	show: PropTypes.string.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(DeleteToolRequest);