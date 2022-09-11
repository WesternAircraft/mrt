import styles from './LinkTechnician.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const LinkTechnician = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.workOrder._id,
		technician: "",
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		if (!Form.technician) {
			SetErrors("Technician is a required field.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/link-technician', {
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
		<div className={styles.title}>Link Technician</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Technician</div>
				<select
					onChange={(e) => SetForm({...Form, technician: e.target.value})}
					value={Form.technician}
				>
					<option value="">-- Select Technician --</option>
					<option value="622e348b275887aa785538eb">Geoff Schaller</option>
				</select>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Link Technician</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

LinkTechnician.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	workOrder: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(LinkTechnician);