import styles from './EditUser.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditUser = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const FormTemplate = {
		_id: "",
		name: "",
		email: "",
		team: "",
		account_type: "",
		active: ""
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		console.log(Form)
		if (!Form.name || !Form.email) {
			SetErrors("User name and email are required Fields");
			return;
		}
		const result = await NETWORK_ADAPTER.post('/MRT/edit-user', {
			...Form,
			created_by: props.UsersReducer.AuthedUser._id
		});
		if (result.code !== 200) {
			SetErrors(result.message);
			return;
		}
		props.handleClose();
		window.location.reload();
	}

	useEffect(() => {
		if (props.show) {
			const index = props.UsersReducer.TeamMembers.findIndex((mem) => mem._id === props.show);
			let user = props.UsersReducer.TeamMembers[index];
			if (user.team === undefined) {
				user.team = ""
			}
			SetForm({...user});
			SetErrors("");
		}
	}, [props.show]);

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.title}>Edit User</div>
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
				<div className={styles.label}>Email <span className={styles.required}>*</span></div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, email: e.target.value})}
					value={Form.email}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Team</div>
				<select
					onChange={(e) => SetForm({...Form, team: e.target.value})}
					value={Form.team}
				>
					<option value="a">A</option>
					<option value="b">B</option>
					<option value="">None</option>
				</select>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Account Type</div>
				<select
					onChange={(e) => SetForm({...Form, account_type: e.target.value})}
					value={Form.account_type}
				>
					<option value="admin">Admin</option>
					<option value="lead">Lead</option>
					<option value="user">User</option>
				</select>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Active</div>
				<select
					onChange={(e) => SetForm({...Form, active: e.target.value})}
					value={Form.active}
				>
					<option value="true">Active</option>
					<option value="false">Disabled</option>
				</select>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Save User</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditUser.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(EditUser);
