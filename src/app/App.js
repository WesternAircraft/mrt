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
		ForceUserOut: () => dispatch(ForceUserOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
