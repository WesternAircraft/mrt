import styles from './EditCustomerContactInformation.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../ButtonBar/ButtonBar";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditCustomerContactInformation = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		company_name: props.airplane.company_name,
		primary_contact: props.airplane.primary_contact,
		primary_contact_phone: props.airplane.primary_contact_phone,
		primary_contact_email: props.airplane.primary_contact_email,
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
		<div className={styles.title}>Edit Customer Contact Information</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Company Name</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, company_name: e.target.value})}
					value={Form.company_name}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Primary Contact</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, primary_contact: e.target.value})}
					value={Form.primary_contact}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Primary Contact Phone</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, primary_contact_phone: e.target.value})}
					value={Form.primary_contact_phone}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Primary Contact Email</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, primary_contact_email: e.target.value})}
					value={Form.primary_contact_email}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Customer Contact Information</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditCustomerContactInformation.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditCustomerContactInformation);