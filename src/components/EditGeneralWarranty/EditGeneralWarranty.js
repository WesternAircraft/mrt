import styles from './EditGeneralWarranty.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../ButtonBar/ButtonBar";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditGeneralWarranty = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		gw_program: props.airplane.gw_program,
		gw_contract_number: props.airplane.gw_contract_number,
		gw_contact_phone: props.airplane.gw_contact_phone,
		gw_contact_email: props.airplane.gw_contact_email,
		special_contract_type: props.airplane.special_contract_type,
		special_contract_number: props.airplane.special_contract_number
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
		<div className={styles.title}>Edit General Warranty Information</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Program</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, gw_program: e.target.value})}
					value={Form.gw_program}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contract #</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, gw_contract_number: e.target.value})}
					value={Form.gw_contract_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Phone</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, gw_contact_phone: e.target.value})}
					value={Form.gw_contact_phone}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Email</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, gw_contact_email: e.target.value})}
					value={Form.gw_contact_email}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Special Contract Type</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, special_contract_type: e.target.value})}
					value={Form.special_contract_type}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Special Contract Number</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, special_contract_number: e.target.value})}
					value={Form.special_contract_number}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update General Warranty Information</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditGeneralWarranty.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditGeneralWarranty);