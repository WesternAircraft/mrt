import styles from './EditAirplaneInformation.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditAirplaneInformation = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		tail_number: props.airplane.tail_number,
		serial_number: props.airplane.serial_number,
		make: props.airplane.make,
		model: props.airplane.model,
		year: props.airplane.year
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		if (!Form.tail_number || !Form.serial_number) {
			SetErrors("Tail Number and Serial Number are all required fields.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/edit-airplane', {
			...Form,
			updated_by: props.UsersReducer.AuthedUser._id
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
		<div className={styles.title}>Edit Airplane Information</div>
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
			<div className={styles.section}>
				<div className={styles.label}>Make</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, make: e.target.value})}
					value={Form.make}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Model</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, model: e.target.value})}
					value={Form.model}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Year</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, year: e.target.value})}
					value={Form.year}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Airplane Information</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditAirplaneInformation.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditAirplaneInformation);