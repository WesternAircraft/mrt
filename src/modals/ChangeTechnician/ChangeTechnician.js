import styles from './ChangeTechnician.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";
import TeamA from '../../data/TeamA';
import TeamB from '../../data/TeamB';

const ChangeTechnician = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.event._id,
		technician: props.event && props.event.technician && props.event.technician._id ? props.event.technician._id : "",
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.technician) {
			SetErrors("Technician is a required fields.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/edit-event', {
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
		<div className={styles.title}>Change Technician</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Technician <span className={styles.required}>*</span></div>
				<select
					onChange={(e) => SetForm({...Form, technician: e.target.value})}
					value={Form.technician}
				>
					<option value="">-- Select Technician --</option>
					{
						[...TeamA, ...TeamB].map((tech) => {
							return <option value={tech.id}>{tech.name}</option>
						})
					}
				</select>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Change Technician</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

ChangeTechnician.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	event: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer,
		AirplanesReducer: state.AirplanesReducer,
		WorkOrdersReducer: state.WorkOrdersReducer
	};
};

export default connect(mapStateToProps)(ChangeTechnician);