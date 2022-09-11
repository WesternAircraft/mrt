import styles from './EditTool.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditTool = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: props.tool._id,
		name: props.tool.name,
		description: props.tool.description,
		make: props.tool.make,
		model: props.tool.model,
		year: props.tool.year,
		serial_number: props.tool.serial_number,
		registration_number: props.tool.registration_number
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		if (!Form.name) {
			SetErrors("Name is a required field.");
			return;
		}
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
		<div className={styles.title}>Edit Tool</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Name</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, name: e.target.value})}
					value={Form.name}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Description</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, description: e.target.value})}
					value={Form.description}
				/>
			</div>
			<div className={styles.row}>
				<div className={styles.section}>
					<div className={styles.label}>Make</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, make: e.target.value})}
						value={Form.make}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.label}>Model</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, model: e.target.value})}
						value={Form.model}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.label}>Year</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, year: e.target.value})}
						value={Form.year}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.section}>
					<div className={styles.label}>Serial Number</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, serial_number: e.target.value})}
						value={Form.serial_number}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.label}>Registration Number</div>
					<input
						type="text"
						onChange={(e) => SetForm({...Form, registration_number: e.target.value})}
						value={Form.registration_number}
					/>
				</div>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Tool</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditTool.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	tool: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditTool);