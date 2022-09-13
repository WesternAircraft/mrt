import styles from './AddToolRequest.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const AddToolRequest = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		tool: "",
		event: props.event._id
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		if (!Form.tool) {
			SetErrors("Tool is a required fields.");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/add-tool-request', {
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
		<div className={styles.title}>Add Tool Request</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Tool <span className={styles.required}>*</span></div>
				<select
					onChange={(e) => SetForm({...Form, tool: e.target.value})}
					value={Form.tool}
				>
					<option value="">-- Select Tool --</option>
					{
						props.ToolsReducer.Tools.map((tool) => {
							return <option value={tool._id}>{tool.name}</option>
						})
					}
				</select>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Tool Request</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddToolRequest.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	event: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer,
		ToolsReducer: state.ToolsReducer
	};
};

export default connect(mapStateToProps)(AddToolRequest);