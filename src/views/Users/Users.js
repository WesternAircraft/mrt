import styles from './users.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {connect} from "react-redux";
import {GetAllTools} from "../../redux/actions/GetAllTools";
import AddUser from "../../modals/AddUser/AddUser";
import EditUser from "../../modals/EditUser/EditUser";

const ToolList = (props) => {

	const [ShowAddUser, SetShowAddUser] = useState(false);
	const [ShowEditUser, SetShowEditUser] = useState(false);

	return <PageWrapper>
		<div className={styles.airplanesList}>
			<ButtonBar position={'right'}>
				<Button color={'#14394c'} handleClick={() => SetShowAddUser(true)}>Add User</Button>
			</ButtonBar>
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.small}/>
					<div className={styles.long}>Name</div>
					<div className={styles.extra}>Email</div>
					<div className={styles.long}>Team</div>
					<div className={styles.long}>Account Type</div>
					<div className={styles.long}>Active</div>
					<div className={styles.small}/>
				</div>
				{
					props.UsersReducer.TeamMembers.map((user, index) => {
						return <div className={styles.item} key={index}>
							<div className={styles.small}>#{index + 1}</div>
							<div className={styles.long}>{user.name}</div>
							<div className={styles.extra}>{user.email}</div>
							<div className={styles.long}>
								{
									user.team
										? user.team.toUpperCase()
										: "-"
								}
							</div>
							<div className={styles.long}>{user.account_type}</div>
							<div className={styles.long}>
								{
									user.active
										? <div className={styles.active}/>
										: <div className={styles.disabled}/>
								}
							</div>
							<div className={styles.icons}>
								<i className="fa-regular fa-pen-to-square" onClick={() => SetShowEditUser(user._id)}/>
							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddUser show={ShowAddUser} handleClose={() => SetShowAddUser(false)}/>
		<EditUser show={ShowEditUser} handleClose={() => SetShowEditUser(false)}/>
	</PageWrapper>
}

	const mapStateToProps = (state) => {
		return {
			ToolsReducer: state.ToolsReducer,
			UsersReducer: state.UsersReducer
		};
	};

	const mapDispatchToProps = (dispatch) => {
		return {
			GetAllTools: () => dispatch(GetAllTools())
		};
	};

	export default connect(mapStateToProps, mapDispatchToProps)(ToolList);
