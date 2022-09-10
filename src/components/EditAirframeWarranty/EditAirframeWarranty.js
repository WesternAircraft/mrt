import styles from './EditAirframeWarranty.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../ButtonBar/ButtonBar";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditAirframeWarranty = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		airframe_warranty_program: props.airplane.airframe_warranty_program,
		airframe_contract_number: props.airplane.airframe_contract_number,
		airframe_contact_number: props.airplane.airframe_contact_number,
		airframe_contact_email: props.airplane.airframe_contact_email
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
		<div className={styles.title}>Edit Airframe Warranty Information</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Program</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_warranty_program: e.target.value})}
					value={Form.airframe_warranty_program}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contract #</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_contract_number: e.target.value})}
					value={Form.airframe_contract_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Phone</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_contact_number: e.target.value})}
					value={Form.airframe_contact_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Email</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, airframe_contact_email: e.target.value})}
					value={Form.airframe_contact_email}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Airframe Warranty</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditAirframeWarranty.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditAirframeWarranty);