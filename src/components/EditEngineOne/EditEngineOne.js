import styles from './EditEngineOne.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../ButtonBar/ButtonBar";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditEngineOne = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.airplane._id,
		engine_one_make: props.airplane.engine_one_make,
		engine_one_model: props.airplane.engine_one_model,
		engine_one_serial_number: props.airplane.engine_one_serial_number,
		engine_one_cycles: props.airplane.engine_one_cycles
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
		<div className={styles.title}>Edit Engine One</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Make</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, engine_one_make: e.target.value})}
					value={Form.engine_one_make}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Model</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, engine_one_model: e.target.value})}
					value={Form.engine_one_model}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Serial Number</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, engine_one_serial_number: e.target.value})}
					value={Form.engine_one_serial_number}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Latest Cycles</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, engine_one_cycles: e.target.value})}
					value={Form.engine_one_cycles}
				/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Engine One</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditEngineOne.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	airplane: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditEngineOne);