import styles from './LogIn.module.sass';
import {GetUserFromIO} from "../../redux/actions/GetUserFromIO";
import {SetAuthedUser} from "../../redux/actions/SetAuthedUser";
import {connect} from "react-redux";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import PermissionCheck from "../../utils/functions/PermissionCheck";
import {AuthenticateUser} from "../../redux/actions/AuthenticateUser";
import { useState } from 'react';
import { useEffect } from 'react';
import {BarLoader} from 'react-spinners';
import {GetAllAirplanes} from "../../redux/actions/GetAllAirplanes";
import {GetAllTools} from "../../redux/actions/GetAllTools";
import {GetAllToolRequests} from "../../redux/actions/GetAllToolRequests";

const LogIn = (props) => {

	const FormTemplate = {
		username: "",
		password: ""
	}

	const [Form, SetForm] = useState({...FormTemplate});
	const [Errors, SetErrors] = useState("");
	const [Processing, SetProcessing] = useState(false);

	const Authenticate = async () => {
		SetErrors("");
		await SetProcessing(true);
		if(!Form.username || !Form.password) {
			SetErrors("Username and Password are required fields.");
			await SetProcessing(false);
			return;
		}
		const AuthResult = await props.AuthenticateUser({...Form});
		if(AuthResult.code !== 200) {
			SetErrors(AuthResult.message);
			await SetProcessing(false);
			return;
		}
		console.log("User successfully authenticated...");
		console.log(AuthResult.payload)
		if(!PermissionCheck(AuthResult.payload.permissions, ['MRT_MASTER', 'MRT_TECHNICIAN'])){
			SetForm({...FormTemplate})
			SetErrors("You are not permitted to access this area.");
			console.log("Cannot access area");
			await SetProcessing(false);
			return;
		}
		console.log("Permitted!");
		localStorage.setItem('io_auth_token', AuthResult.payload.azureId);
		await props.SetAuthedUser({...AuthResult.payload});
		props.GetAllAirplanes();
		props.GetAllTools();
		props.GetAllToolRequests();
		await SetProcessing(false);
	}

	return <div className={styles.login}>
		<div className={styles.message}>
			<i className="fa-light fa-sensor-triangle-exclamation"/>
			<div className={styles.title}>WAI Restricted Area</div>
			<div className={styles.description}>Western Aircraft has restricted access to this site. If you have been
				given permission to access this area, please log in below.
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Email <span className={styles.required}>*</span></div>
				<input type="email" onChange={(e) => SetForm({...Form, username: e.target.value})} value={Form.username}/>
			</div>
			<div className={styles.section}>
				<div className={styles.label}>Password <span className={styles.required}>*</span></div>
				<input type="password" onChange={(e) => SetForm({...Form, password: e.target.value})} value={Form.password}/>
			</div>
			{
				Processing
					? <BarLoader color="#52BE80" width={'98%'}/>
					: <ButtonBar position={'right'}>
					<Button color={'#5499C7'} handleClick={() => Authenticate()} long>Login</Button>
				</ButtonBar>
			}
			<div className={styles.errors}>{Errors}</div>
		</div>
	</div>
}

const mapDispatchToProps = (dispatch) => {
	return {
		GetUserFromIO: (id) => dispatch(GetUserFromIO(id)),
		SetAuthedUser: (user) => dispatch(SetAuthedUser(user)),
		AuthenticateUser: (data) => dispatch(AuthenticateUser(data)),
		GetAllAirplanes: () => dispatch(GetAllAirplanes()),
		GetAllTools: () => dispatch(GetAllTools()),
		GetAllToolRequests: () => dispatch(GetAllToolRequests())
	};
};

export default connect(null, mapDispatchToProps)(LogIn);