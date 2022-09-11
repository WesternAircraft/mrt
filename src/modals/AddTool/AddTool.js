import styles from './AddTool.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const AddTool = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		name: "",
		description: ""
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.name) {
			SetErrors("Tool name is a required Field");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/add-tool', {
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
		<div className={styles.title}>Add Tool</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Name <span className={styles.required}>*</span></div>
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
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Tool</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddTool.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(AddTool);