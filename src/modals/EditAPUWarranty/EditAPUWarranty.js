import styles from './EditAPUWarranty.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditAPUWarranty = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		apu_warranty_program: props.airplane.apu_warranty_program,
		apu_contract_number: props.airplane.apu_contract_number,
		apu_contact_number: props.airplane.apu_contact_number,
		apu_contact_email: props.airplane.apu_contact_email
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
		<div className={styles.title}>Edit APU Warranty Information</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Program</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, apu_warranty_program: e.target.value})}
					value={Form.apu_warranty_program}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contract #</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, apu_contract_number: e.target.value})}
					value={Form.apu_contract_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Phone</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, apu_contact_number: e.target.value})}
					value={Form.apu_contact_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Email</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, apu_contact_email: e.target.value})}
					value={Form.apu_contact_email}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update APU Warranty</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditAPUWarranty.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditAPUWarranty);