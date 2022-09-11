import styles from './EditAirframe.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditAirframe = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		airframe_make: props.airplane.airframe_make,
		airframe_model: props.airplane.airframe_model,
		airframe_serial_number: props.airplane.airframe_serial_number,
		airframe_cycles: props.airplane.airframe_cycles
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
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
		<div className={styles.title}>Edit Airframe</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Make</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_make: e.target.value})}
					value={Form.airframe_make}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Model</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_model: e.target.value})}
					value={Form.airframe_model}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Serial Number</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_serial_number: e.target.value})}
					value={Form.airframe_serial_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Latest Cycles</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_cycles: e.target.value})}
					value={Form.airframe_cycles}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Airframe</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditAirframe.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditAirframe);