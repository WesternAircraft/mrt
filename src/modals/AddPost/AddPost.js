import styles from './AddPost.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";
import {NETWORK_ADDRESS} from "../../config/Network";

const AddPost = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		tool: "",
		event: props.event._id,
		post: "",
		type: "user_post"
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");
	const [File, SetFile] = useState();

	const SubmitForm = async () => {
		if (!Form.post) {
			SetErrors("Post is a required field");
			return;
		}
		const formData = new FormData();
		formData.append('File', File);
		formData.append('post', Form.post);
		formData.append('type', Form.type);
		formData.append('event', Form.event);
		formData.append('user', props.UsersReducer.AuthedUser._id);
		fetch(
			NETWORK_ADDRESS + "/api/MRT/create-post",
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
		<div className={styles.title}>Add Post to Work Order</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Post <span className={styles.required}>*</span></div>
				<textarea
					placeholder={"What do you want to say?"}
					onChange={(e) => SetForm({...Form, post: e.target.value})}
					value={Form.post}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Upload File</div>
				<input type="file" onChange={(e) => SetFile(e.target.files[0])}/>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Add Post</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

AddPost.propTypes = {
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

export default connect(mapStateToProps)(AddPost);