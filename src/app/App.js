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

const App = (props) => {

	const GetUser = async (id) => {
		const result = await props.GetUserFromIO(id);
		if (result.code === 200) {
			props.SetAuthedUser({...result.payload})
		}
	}

	useEffect(() => {
		if (!props.UsersReducer.AuthedUser) {
			console.log("Checking for stored user.")
			const storedUser = localStorage.getItem('beacon_user');
			if (!storedUser) {
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
					props.UsersReducer.AuthedUser
						? <Switch>
							<Route path={'/'} exact component={Dashboard}/>
						</Switch>
						: <Route path={'/'} exact component={LogIn}/>
				}
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
		SetAuthedUser: (user) => dispatch(SetAuthedUser(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
