import styles from './EditToolWarranty.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditToolWarranty = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.tool._id,
		warranty_contact: props.tool.warranty_contact,
		contact_number: props.tool.contact_number,
		contact_email: props.tool.contact_email,
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		const result = await NETWORK_ADAPTER.post('/MRT/edit-tool', {
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
		<div className={styles.title}>Edit Tool Warranty</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Warranty Contact</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, warranty_contact: e.target.value})}
					value={Form.warranty_contact}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Number</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, contact_number: e.target.value})}
					value={Form.contact_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Contact Email</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, contact_email: e.target.value})}
					value={Form.contact_email}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Tool Warranty</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditToolWarranty.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	tool: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditToolWarranty);