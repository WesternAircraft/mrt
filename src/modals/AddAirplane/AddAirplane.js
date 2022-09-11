import styles from './AddAirplane.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const AddAirplane = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		tail_number: "",
		serial_number: "",
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.tail_number || !Form.serial_number) {
			SetErrors("Tail Number and Serial Number are all required fields.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/add-airplane', {
			...Form,
			created_by: props.UsersReducer.AuthedUser._id
		});
		if (result.code !== 200) {
			SetErrors(result.message);
			return;
		}
		props.handleClose();
	}

	useEffect(() => {
		if (props.show) {
			SetForm({...FormTemplate});
			SetErrors("");
		}
	}, [props.show]);

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.title}>Add Airplane</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Tail Number <span className={styles.required}>*</span></div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, tail_number: e.target.value})}
					value={Form.tail_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Serial number <span className={styles.required}>*</span></div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, serial_number: e.target.value})}
					value={Form.serial_number}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Airplane</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddAirplane.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(AddAirplane);