import styles from './ChangeEvent.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const ChangeEvent = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.event._id,
		start_date: props.event.start_date,
		end_date: props.event.end_date,
		type: props.event.type,
		city: props.event.city,
		work_order: props.event.work_order
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.start_date || !Form.end_date || !Form.type) {
			SetErrors("Start Date, End Date and Type are required fields.");
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
		<div className={styles.title}>Change Event</div>
		<div className={styles.form}>
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
			<div className={styles.row}>
				<div className={styles.section}>
					<div className={styles.label}>City</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, city: e.target.value})}
						value={Form.city}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.label}>Work Order</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, work_order: e.target.value})}
						value={Form.work_order}
					/>
				</div>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Change Event</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

ChangeEvent.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	event: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer,
		AirplanesReducer: state.AirplanesReducer,
	};
};

export default connect(mapStateToProps)(ChangeEvent);