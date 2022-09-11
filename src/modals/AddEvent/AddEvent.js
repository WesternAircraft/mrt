import styles from './AddEvent.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const AddEvent = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		technician: "",
		type: "",
		start_date: "",
		end_date: "",
		city: "",
		tail_number: "",
		work_order_number: ""
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.technician || !Form.start_date || !Form.end_date || !Form.type) {
			SetErrors("Technician, Start Date, End Date, and Event Type are all required fields.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/add-user-event', {
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
		<div className={styles.title}>Add Calendar Event</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Technician <span className={styles.required}>*</span></div>
				<select
					onChange={(e) => SetForm({...Form, technician: e.target.value})}
					value={Form.technician}
				>
					<option value="">-- Select Technician --</option>
					<option value="622e348b275887aa785538eb">Geoff Schaller</option>
				</select>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Event Type <span className={styles.required}>*</span></div>
				<select
					onChange={(e) => SetForm({...Form, type: e.target.value})}
					value={Form.type}
				>
					<option value="">-- Select Event Type --</option>
					<option value="booking">Technician Booking</option>
					<option value="time_off">Time Off</option>
				</select>
			</div>
			<div className={styles.row}>
				<div className={styles.section}>
					<div className={styles.label}>Start Date <span className={styles.required}>*</span></div>
					<input
						type="date"
						onChange={(e) => SetForm({...Form, start_date: e.target.value})}
						value={Form.start_date}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.label}>End Date <span className={styles.required}>*</span></div>
					<input
						type="date"
						onChange={(e) => SetForm({...Form, end_date: e.target.value})}
						value={Form.end_date}
					/>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>City</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, city: e.target.value})}
					value={Form.city}
				/>
			</div>
			<div className={styles.row}>
				<div className={styles.section}>
					<div className={styles.label}>Tail Number</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, tail_number: e.target.value})}
						value={Form.tail_number}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.label}>Work Order Number</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, work_order_number: e.target.value})}
						value={Form.work_order_number}
					/>
				</div>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Event</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddEvent.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(AddEvent);