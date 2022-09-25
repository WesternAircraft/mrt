import styles from './ChangeAirplane.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const ChangeAirplane = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.event._id,
		airplane: props.event && props.event.airplane && props.event.airplane._id ? props.event.airplane._id : "",
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.airplane) {
			SetErrors("Airplane is a required fields.");
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
		<div className={styles.title}>Change Airplane</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Airplane <span className={styles.required}>*</span></div>
				<select
					onChange={(e) => SetForm({...Form, airplane: e.target.value})}
					value={Form.airplane}
				>
					<option value="">-- Select Airplane --</option>
					{
						props.AirplanesReducer.Airplanes.map((airplane, index) => {
							return <option value={airplane._id} key={index}>{airplane.tail_number}</option>
						})
					}

				</select>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Change Airplane</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

ChangeAirplane.propTypes = {
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

export default connect(mapStateToProps)(ChangeAirplane);