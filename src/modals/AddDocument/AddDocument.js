import styles from './AddDocument.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";
import {NETWORK_ADDRESS} from "../../config/Network";

const AddDocument = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		name: "",
		description: "",
		type: "user_post"
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");
	const [File, SetFile] = useState();

	const SubmitForm = async () => {
		if (!Form.name || !File || !Form.description) {
			SetErrors("Name, Description and File are required fields");
			return;
		}
		const formData = new FormData();
		formData.append('File', File);
		formData.append('name', Form.name);
		formData.append('description', Form.description);
		formData.append('created_by', props.UsersReducer.AuthedUser._id);
		fetch(
			NETWORK_ADDRESS + "/api/MRT/create-document",
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				props.handleClose();
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	useEffect(() => {
		if (props.show) {
			SetForm({...FormTemplate});
			SetErrors("");
		}
	}, [props.show]);

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.title}>Add Document</div>
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
				<div className={styles.label}>Description <span className={styles.required}>*</span></div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, description: e.target.value})}
					value={Form.description}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Upload File</div>
				<input type="file" onChange={(e) => SetFile(e.target.files[0])}/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Document</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddDocument.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer,
		ToolsReducer: state.ToolsReducer
	};
};

export default connect(mapStateToProps)(AddDocument);