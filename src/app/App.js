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
import Unauthorized from "../views/Unauthorized/Unauthorized";
import {LOCAL_ADDRESS} from "../config/Network";
import {ForceUserOut} from "../redux/actions/ForceUserOut";
import PermissionCheck from "../utils/functions/PermissionCheck";
import AirplanesList from "../views/AirplanesList/AirplanesList";
import {GetAllAirplanes} from "../redux/actions/GetAllAirplanes";
import ViewAirplane from "../views/ViewAirplane/ViewAirplane";
import ToolList from "../views/ToolList/ToolList";
import {GetAllTools} from "../redux/actions/GetAllTools";
import ViewEvent from "../views/ViewEvent/ViewEvent";

const App = (props) => {

	const GetUser = async (id) => {
		const result = await props.GetUserFromIO(id);
		if (result.code === 200) {
			if (PermissionCheck(result.payload.permissions, ['MRT_FULL_ADMIN'])) {
				console.log("FULL ADMIN!")
				props.SetAuthedUser({...result.payload})
			} else {
				window.location = LOCAL_ADDRESS + '/unauthorized';
				props.ForceUserOut();
				console.log("UN-AUTHORIZED!!!!!")
			}
		}
	}

	useEffect(() => {
		props.GetAllAirplanes();
		props.GetAllTools();
		if (!props.UsersReducer.AuthedUser) {
			console.log("Checking for stored user.")
			const storedUser = localStorage.getItem('beacon_user');
			if (!storedUser) {
				props.ForceUserOut();
				console.log("No stored user found.");
			} else {
				console.log("Found stored user.")
				GetUser(storedUser);
			}
		}
	}, []);

	return (
		<HashRouter>
			<div className={styles.app}>
				<div><Toaster/></div>
				{
					props.UsersReducer.AuthedUser && props.UsersReducer.AuthedUser.azureId
						? <Switch>
							<Route path={'/'} exact component={Dashboard}/>
							<Route path={'/airplanes'} exact component={AirplanesList}/>
							<Route path={'/airplanes/:id'} exact component={ViewAirplane}/>
							<Route path={'/tooling'} exact component={ToolList}/>
							<Route path={'/:id'} exact component={ViewEvent}/>
						</Switch>
						: <Route path={'/'} exact component={LogIn}/>
				}
				<Route path={'/unauthorized'} exact component={Unauthorized}/>
				<Route path={'/logged-out'} exact component={LogIn}/>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
