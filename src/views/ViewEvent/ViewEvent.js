import styles from './ViewEvent.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import moment from "moment-timezone";
import ChangeTechnician from "../../modals/ChangeTechnician/ChangeTechnician";
import ChangeAirplane from "../../modals/ChangeAirplane/ChangeAirplane";
import ChangeEvent from "../../modals/ChangeEvent/ChangeEvent";
import {Link} from "react-router-dom";
import AddToolRequest from "../../modals/AddToolRequest/AddToolRequest";
import {GetAllToolRequests} from "../../redux/actions/GetAllToolRequests";
import {connect} from "react-redux";

const ViewEvent = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Event, SetEvent] = useState({});
	const [ShowChangeTechnician, SetChangeTechnician] = useState(false);
	const [ShowChangeAirplane, SetChangeAirplane] = useState(false);
	const [ShowChangeEvent, SetChangeEvent] = useState(false);
	const [ShowAddToolRequest, SetAddToolRequest] = useState(false);

	const GetEvent = async () => {
		const result = await NETWORK_ADAPTER.get('/MRT/get-event/' + props.match.params.id);
		if (result.code === 200) {
			SetEvent({...result.payload});
			console.log(result.payload)
			return;
		}
		console.log(result.message)
	}

	const ToggleAlert = async () => {
		const result = await NETWORK_ADAPTER.post('/MRT/edit-event/', {...Event, alert: !Event.alert});
		if (result.code === 200) {
			GetEvent();
			return;
		}
		console.log(result.message)
	}

	useEffect(() => {
		GetEvent();
	}, []);

	return <PageWrapper>
		<div className={styles.viewTool}>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Event Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetChangeEvent(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Start Date</div>
							<div className={styles.num}>
								{
									Event.start_date
										? Event.start_date
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>End Date</div>
							<div className={styles.num}>
								{
									Event.end_date
										? Event.end_date
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Type</div>
							<div className={styles.num}>
								{
									Event.type
										? Event.type
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>City</div>
							<div className={styles.num}>
								{
									Event.city
										? Event.city
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Created By</div>
							<div className={styles.num}>
								{
									Event.created_by
										? Event.created_by.name
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Creation Date</div>
							<div className={styles.num}>
								{
									Event.createdAt
										? moment(Event.createdAt).format("YYYY-MM-DD")
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Technician</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetChangeTechnician(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Name</div>
							<div className={styles.num}>
								{
									Event.technician && Event.technician.name
										? Event.technician.name
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Email</div>
							<div className={styles.num}>
								{
									Event.technician && Event.technician.email
										? Event.technician.email
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Phone</div>
							<div className={styles.num}>
								{
									Event.technician && Event.technician.phone
										? Event.technician.phone
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Technician Actions</div>
					</div>
					<div className={styles.list}>
						{
							Event.alert
								? <div
									className={[styles.alert, styles.blockButton].join(' ')}
									onClick={() => ToggleAlert()}
								>
									Un-Set Alert
								</div>
								: <div
									className={[styles.blockButton].join(' ')}
									onClick={() => ToggleAlert()}
								>
									Set Alert
								</div>
						}
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Airplane Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetChangeAirplane(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Tail Number</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.tail_number
										?
										<Link
											to={'/airplanes/' + Event.airplane._id}>{Event.airplane.tail_number}</Link>
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.make
										? Event.airplane.make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.model
										? Event.airplane.model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Year</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.year
										? Event.airplane.year
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.serial_number
										? Event.airplane.serial_number
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Contact Information</div>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Contact Name</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.primary_contact
										? Event.airplane.primary_contact
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Company</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.company_name
										? Event.airplane.company_name
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Email</div>
							<div className={styles.num}>
								{
									Event.airplane && Event.airplane.primary_contact_email
										? Event.airplane.primary_contact_email
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Tool Requests</div>
						<i
							className="fa-regular fa-plus"
							onClick={() => SetAddToolRequest(true)}
						/>
					</div>
				</div>
				{
					props.ToolRequestsReducer.ToolRequests.filter((req) => req.event === Event._id).map((request) => {
						return <div className={styles.section}>
							<div className={styles.title}>
								<div>{request.tool.name}</div>
							</div>
							<div className={styles.list}>
								<div className={styles.information}>
									<div className={styles.label}>Inbound Tracking</div>
									<div className={styles.num}>
										{
											request.inbound_tracking
												? request.inbound_tracking
												: '-'
										}
									</div>
								</div>
								<div className={styles.information}>
									<div className={styles.label}>Outbound Tracking</div>
									<div className={styles.num}>
										{
											request.outbound_tracking
												? request.outbound_tracking
												: '-'
										}
									</div>
								</div>
								<div className={styles.information}>
									<div className={styles.label}>Status</div>
									<div className={styles.num}>
										{
											request.status
												? request.status
												: '-'
										}
									</div>
								</div>
							</div>
						</div>
					})
				}
			</div>
			<div className={styles.long}>
				<div className={styles.section}>
					ACTIONS
				</div>
			</div>
		</div>
		<ChangeTechnician event={Event} show={ShowChangeTechnician} handleClose={() => {
			SetChangeTechnician(false);
			GetEvent();
		}}/>
		<ChangeAirplane event={Event} show={ShowChangeAirplane} handleClose={() => {
			SetChangeAirplane(false);
			GetEvent();
		}}/>
		<ChangeEvent event={Event} show={ShowChangeEvent} handleClose={() => {
			SetChangeEvent(false);
			GetEvent();
		}}/>
		<AddToolRequest event={Event} show={ShowAddToolRequest} handleClose={() => {
			SetAddToolRequest(false);
			props.GetAllToolRequests();
		}}/>
		{/*<EditToolWarranty tool={Tool} show={ShowEditToolWarranty} handleClose={() => {*/}
		{/*	SetEditToolWarranty(false);*/}
		{/*	GetTool();*/}
		{/*}}/>*/}
	</PageWrapper>
}

const mapStateToProps = (state) => {
	return {
		ToolRequestsReducer: state.ToolRequestsReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		GetAllToolRequests: () => dispatch(GetAllToolRequests())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);