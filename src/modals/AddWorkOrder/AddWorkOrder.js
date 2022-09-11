import styles from './AddWorkOrder.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const AddWorkOrder = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		number: "",
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		if (!Form.number) {
			SetErrors("Work order number is a required field.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/add-work-order', {
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
		<div className={styles.title}>Add Work Order</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Number <span className={styles.required}>*</span></div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, number: e.target.value})}
					value={Form.number}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Work Order</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddWorkOrder.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(AddWorkOrder);