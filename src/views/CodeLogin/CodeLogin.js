import styles from './CodeLogin.module.sass';
import {useState} from "react";
import {BarLoader} from "react-spinners";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {SendMFACode} from "../../redux/actions/SendMFACode";
import {connect} from "react-redux";
import {VerifyMFACode} from "../../redux/actions/VerifyMFACode";
import {SetAuthedUser} from "../../redux/actions/SetAuthedUser";
import {AuthenticateUser} from "../../redux/actions/AuthenticateUser";
import {GetAllAirplanes} from "../../redux/actions/GetAllAirplanes";
import {GetAllTools} from "../../redux/actions/GetAllTools";
import {GetAllToolRequests} from "../../redux/actions/GetAllToolRequests";
import {GetTeamMembers} from "../../redux/actions/GetTeamMembers";

const CodeLogin = (props) => {

	const [Email, SetEmail] = useState("");
	const [Errors, SetErrors] = useState("");
	const [Processing, SetProcessing] = useState(false);
	const [Code, SetCode] = useState("");
	const [Tab, SetTab] = useState("LOGIN");

	const GenerateAndSendCode = async () => {
		SetProcessing(true);
		SetErrors("");
		if (!Email) {
			SetErrors("Email is required.");
			SetProcessing(false);
			return;
		}
		const result = await props.SendMFACode(Email);
		if (result.code !== 200) {
			SetErrors(result.message);
			SetProcessing(false);
			return;
		}
		SetTab("CODE");
		SetProcessing(false);
	}

	const ValidateCodeAndLogin = async () => {
		SetErrors("");
		SetProcessing(true);
		if (!Email) {
			SetErrors("Email is required.");
			SetProcessing(false);
			return;
		}
		if (!Code) {
			SetErrors("MFA Code is required.");
			SetProcessing(false);
			return;
		}
		const result = await props.VerifyMFACode(Email, Code);
		if (result.code !== 200) {
			SetErrors(result.message);
			SetProcessing(false);
			return;
		}
		localStorage.setItem('mrt_io_auth_token', result.payload.token);
		await props.SetAuthedUser({...result.payload});
		props.GetAllAirplanes();
		props.GetAllTools();
		props.GetAllToolRequests();
		props.GetTeamMembers();
		SetProcessing(false);
	}

	return <div className={styles.codeLogin}>
		{
			Tab === "LOGIN"
				? <div>
					<div className={styles.message}>
						<i className="fa-light fa-sensor-triangle-exclamation"/>
						<div className={styles.title}>WAI Restricted Area</div>
						<div className={styles.description}>Western Aircraft has restricted access to this site. If you have
							been
							given permission to access this area, please log in below.
						</div>
						<div className={styles.section}>
							<div className={styles.label}>Email <span className={styles.required}>*</span></div>
							<input type="email" onChange={(e) => SetEmail(e.target.value)} value={Email}/>
						</div>
						{
							Processing
								? <BarLoader color="#52BE80" width={'98%'}/>
								: <ButtonBar position={'right'}>
									<Button color={'#5499C7'} handleClick={() => GenerateAndSendCode()} long>Send MFA
										Code</Button>
								</ButtonBar>
						}
						<div className={styles.errors}>{Errors}</div>
					</div>
				</div>
				: <div>
					<div className={styles.message}>
						<i className="fa-light fa-sensor-triangle-exclamation"/>
						<div className={styles.title}>WAI Restricted Area</div>
						<div className={styles.description}>Western Aircraft has restricted access to this site. If you have
							been
							given permission to access this area, please log in below.
						</div>
						<div className={styles.section}>
							<div className={styles.label}>Code sent via email<span className={styles.required}>*</span>
							</div>
							<input type="text" onChange={(e) => SetCode(e.target.value)} value={Code}/>
						</div>
						{
							Processing
								? <BarLoader color="#52BE80" width={'98%'}/>
								: <ButtonBar position={'right'}>
									<Button color={'#EC7063'} handleClick={() => SetTab("LOGIN")} long>Cancel</Button>
									<Button color={'#5499C7'} handleClick={() => ValidateCodeAndLogin()} long>Login</Button>
								</ButtonBar>
						}
						<div className={styles.errors}>{Errors}</div>
					</div>
				</div>
		}
	</div>

}

const mapDispatchToProps = (dispatch) => {
	return {
		SendMFACode: (email) => dispatch(SendMFACode(email)),
		VerifyMFACode: (email, code) => dispatch(VerifyMFACode(email, code)),
		SetAuthedUser: (user) => dispatch(SetAuthedUser(user)),
		GetAllAirplanes: () => dispatch(GetAllAirplanes()),
		GetAllTools: () => dispatch(GetAllTools()),
		GetAllToolRequests: () => dispatch(GetAllToolRequests()),
		GetTeamMembers: () => dispatch(GetTeamMembers())
	};
};

export default connect(null, mapDispatchToProps)(CodeLogin);
