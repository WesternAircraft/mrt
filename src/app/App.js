import styles from './App.module.sass';
import {useEffect} from "react";
import {connect} from "react-redux";
import {Switch} from "react-router";
import {HashRouter, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import LogIn from "../views/LogIn/LogIn";
import {GetUserFromIO} from "../redux/actions/GetUserFromIO";
import {SetAuthedUser} from "../redux/actions/SetAuthedUser";
import Dashboard from "../views/Dashboard/Dashboard";
import {ForceUserOut} from "../redux/actions/ForceUserOut";
import AirplanesList from "../views/AirplanesList/AirplanesList";
import {GetAllAirplanes} from "../redux/actions/GetAllAirplanes";
import ViewAirplane from "../views/ViewAirplane/ViewAirplane";
import ToolList from "../views/ToolList/ToolList";
import {GetAllTools} from "../redux/actions/GetAllTools";
import ViewEvent from "../views/ViewEvent/ViewEvent";
import {GetAllToolRequests} from "../redux/actions/GetAllToolRequests";
import DocumentList from "../views/DocumentList/DocumentList";
import CodeLogin from "../views/CodeLogin/CodeLogin";
import {ValidateUserToken} from "../redux/actions/ValidateUserToken";

const App = (props) => {

	const GetUser = async (stored_token) => {
		const result = await props.ValidateUserToken(stored_token);
		if (result.code === 200) {
			props.GetAllAirplanes();
			props.GetAllTools();
			props.GetAllToolRequests();
			props.SetAuthedUser({...result.payload})
		}
	}

	useEffect(() => {
		const run = async () => {
			console.log("Checking for stored user.")
			const stored_token = localStorage.getItem('mrt_io_auth_token');
			if (!stored_token) {
				console.log("No stored user found.");
			} else {
				console.log("Found stored user.")
				await GetUser(stored_token);
			}
		}
		if (!props.UsersReducer.AuthedUser) {
			run();
		}
	}, []);

	return (
		<HashRouter>
			<div className={styles.app}>
				<div><Toaster/></div>
				{
					props.UsersReducer.AuthedUser
						? <Switch>
							<Route path={'/'} exact component={Dashboard}/>
							<Route path={'/airplanes'} exact component={AirplanesList}/>
							<Route path={'/airplanes/:id'} exact component={ViewAirplane}/>
							<Route path={'/tooling'} exact component={ToolList}/>
							<Route path={'/documents'} exact component={DocumentList}/>
							<Route path={'/:id'} exact component={ViewEvent}/>
						</Switch>
						: <Route path={'/'} exact component={CodeLogin}/>
				}
			</div>
		</HashRouter>
	);
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		GetUserFromIO: (id) => dispatch(GetUserFromIO(id)),
		SetAuthedUser: (user) => dispatch(SetAuthedUser(user)),
		ForceUserOut: () => dispatch(ForceUserOut()),
		GetAllAirplanes: () => dispatch(GetAllAirplanes()),
		GetAllTools: () => dispatch(GetAllTools()),
		GetAllToolRequests: () => dispatch(GetAllToolRequests()),
		ValidateUserToken: (token) => dispatch(ValidateUserToken(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
