import styles from './EditToolRequest.module.sass';
import PropTypes from "prop-types";
import Modal from "../../wrappers/Modal/Modal";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import {connect} from "react-redux";

const EditToolRequest = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Form, SetForm] = useState({
		_id: "",
		tool: "",
		inbound_tracking: "",
		outbound_tracking: "",
		status: ""
	});
	const [Errors, SetErrors] = useState("");

	const SubmitForm = async () => {
		const result = await NETWORK_ADAPTER.post('/MRT/edit-tool-request', {
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
		console.log(props.show)
		if (props.show) {
			SetForm({
				_id: props.show._id,
				tool: props.show.tool._id,
				inbound_tracking: props.show.inbound_tracking,
				outbound_tracking: props.show.outbound_tracking,
				status: props.show.status
			});
			SetErrors("");
		}
	}, [props.show]);

	return <Modal show={props.show} handleClose={props.handleClose}>
		<div className={styles.title}>Edit Tool Request</div>
		<div className={styles.form}>
			<div className={styles.section}>
				<div className={styles.label}>Inbound Tracking</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, inbound_tracking: e.target.value})}
					value={Form.inbound_tracking}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Outbound Tracking</div>
				<input
					type="text"
					onChange={(e) => SetForm({...Form, outbound_tracking: e.target.value})}
					value={Form.outbound_tracking}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Status <span className={styles.required}>*</span></div>
				<select
					onChange={(e) => SetForm({...Form, status: e.target.value})}
					value={Form.status}
				>
					<option value={'Requested'}>Requested</option>
					<option value={'Rejected Request - Unavailable'}>Rejected Request - Unavailable</option>
					<option value={'Rejected Request - Damaged'}>Rejected Request - Damaged</option>
					<option value={'Inbound'}>Inbound</option>
					<option value={'Arrived - Good Condition'}>Arrived - Good Condition</option>
					<option value={'Arrived - Damaged'}>Arrived - Damaged</option>
					<option value={'Outbound'}>Outbound</option>
				</select>
			</div>
			<ButtonBar position={'right'}>
				<Button color={'#EC7063'} handleClick={props.handleClose}>Cancel</Button>
				<Button color={'#7DCEA0'} handleClick={() => SubmitForm()}>Update Tool Request</Button>
			</ButtonBar>
			<div className={styles.errors}>{Errors}</div>
		</div>
	</Modal>
}

EditToolRequest.propTypes = {
	show: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer,
		ToolsReducer: state.ToolsReducer
	};
};

export default connect(mapStateToProps)(EditToolRequest);