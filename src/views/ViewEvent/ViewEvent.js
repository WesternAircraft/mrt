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
import DeleteToolRequest from "../../modals/DeleteToolRequest/DeleteToolRequest";
import EditToolRequest from "../../modals/EditToolRequest/EditToolRequest";
import AddPost from "../../modals/AddPost/AddPost";
import {NETWORK_ADDRESS} from "../../config/Network";

const ViewEvent = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Event, SetEvent] = useState({});
	const [WOEvents, SetWOEvents] = useState([]);
	const [ShowChangeTechnician, SetChangeTechnician] = useState(false);
	const [ShowChangeAirplane, SetChangeAirplane] = useState(false);
	const [ShowChangeEvent, SetChangeEvent] = useState(false);
	const [ShowAddToolRequest, SetAddToolRequest] = useState(false);
	const [ShowDeleteToolRequest, SetDeleteToolRequest] = useState(null);
	const [ShowEditToolRequest, SetEditToolRequest] = useState(null);
	const [ShowAddPost, SetAddPost] = useState(false);

	const GetEvent = async () => {
		const result = await NETWORK_ADAPTER.get('/MRT/get-event/' + props.match.params.id);
		if (result.code === 200) {
			SetEvent({...result.payload});
			return;
		}
		console.log(result.message)
	}

	const GetWOEvents = async () => {
		const events = await NETWORK_ADAPTER.get('/MRT/get-all-work-order-events/' + props.match.params.id);
		if (events.code === 200) {
			console.log(events)
			SetWOEvents([...events.payload])
		}
	}

	const ToggleAlert = async () => {
		const result = await NETWORK_ADAPTER.post('/MRT/edit-event/', {...Event, alert: !Event.alert});
		if (result.code === 200) {
			GetEvent();
			return;
		}
		console.log(result.message)
	}

	const GenerateEvent = (e) => {
		console.log(e);
		switch (e.type) {
			case "created_event":
				return <div className={[styles.log, styles.created_event].join(' ')}>
					<div className={styles.description}>
						{e.user.name} created the event.
					</div>
					<div
						className={styles.date}>{moment(e.createdAt).tz("America/Boise").format("MM-DD-YYYY hh:mmA")}</div>
				</div>
			case "updated_event":
				return <div className={[styles.log, styles.updated_event].join(' ')}>
					<div className={styles.description}>
						{e.user.name} updated the event.
					</div>
					<div
						className={styles.date}>{moment(e.createdAt).tz("America/Boise").format("MM-DD-YYYY hh:mmA")}</div>
				</div>
			case "created_tool_request":
				return <div className={[styles.log, styles.created_tool_request].join(' ')}>
					<div className={styles.description}>
						{e.user.name} created a tool request.
					</div>
					<div
						className={styles.date}>{moment(e.createdAt).tz("America/Boise").format("MM-DD-YYYY hh:mmA")}</div>
				</div>
			case "edited_tool_request":
				return <div className={[styles.log, styles.edited_tool_request].join(' ')}>
					<div className={styles.description}>
						{e.user.name} edited a tool request.
					</div>
					<div
						className={styles.date}>{moment(e.createdAt).tz("America/Boise").format("MM-DD-YYYY hh:mmA")}</div>
				</div>
			case "removed_tool_request":
				return <div className={[styles.log, styles.removed_tool_request].join(' ')}>
					<div className={styles.description}>
						{e.user.name} removed a tool request.
					</div>
					<div
						className={styles.date}>{moment(e.createdAt).tz("America/Boise").format("MM-DD-YYYY hh:mmA")}</div>
				</div>
			case "user_post":
				return <div className={[styles.log, styles.user_post].join(' ')}>
					<div className={styles.description}>
						{
							e.post && e.post !== ""
								? <div>
									{e.user.name} wrote:
									<br/>
									<br/>
									<div className={styles.row}>
										<div className={styles.icon}>
											<i className="fa-regular fa-messages"/>
										</div>
										<div>
											{e.post}
										</div>
									</div>
									<br/>
								</div>
								: null
						}
						{
							e.file && e.file !== ""
								? <div>
									<div className={styles.row}>
										<div className={styles.icon}>
											<i className="fa-regular fa-files"/>
										</div>
										<div>
											<a href={NETWORK_ADDRESS + "/uploads/mrt/" + e.file} target={"_blank"}>
												{e.file}
											</a>
										</div>
									</div>
									<br/>
								</div>
								: null
						}
					</div>
					<div
						className={styles.date}>{moment(e.createdAt).tz("America/Boise").format("MM-DD-YYYY hh:mmA")}</div>
				</div>
			default:
				return null
		}
	}

	useEffect(() => {
		GetEvent();
	}, []);

	useEffect(() => {
		if (Event && Event._id) {
			GetWOEvents();
		}
	}, [Event]);

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
						<div className={styles.information}>
							<div className={styles.label}>Work Order Number</div>
							<div className={styles.num}>
								{
									Event.work_order
										? Event.work_order
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
								<div className={styles.icons}>
									<i
										className="fa-regular fa-trash-can"
										onClick={() => SetDeleteToolRequest(request._id)}
									/>
									<i
										className="fa-regular fa-pen-to-square"
										onClick={() => SetEditToolRequest(request)}
									/>
								</div>
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
					<div className={styles.title}>
						<div>Work Order Timeline</div>
						<i
							className="fa-regular fa-plus"
							onClick={() => SetAddPost(true)}
						/>
					</div>
					<div className={styles.list}>
						{
							WOEvents.map((event) => {
								return GenerateEvent(event)
							})
						}
					</div>
				</div>
			</div>
		</div>
		<ChangeTechnician event={Event} show={ShowChangeTechnician} handleClose={() => {
			SetChangeTechnician(false);
			GetEvent();
			GetWOEvents();
		}}/>
		<ChangeAirplane event={Event} show={ShowChangeAirplane} handleClose={() => {
			SetChangeAirplane(false);
			GetEvent();
			GetWOEvents();
		}}/>
		<ChangeEvent event={Event} show={ShowChangeEvent} handleClose={() => {
			SetChangeEvent(false);
			GetEvent();
			GetWOEvents();
		}}/>
		<AddToolRequest event={Event} show={ShowAddToolRequest} handleClose={() => {
			SetAddToolRequest(false);
			GetWOEvents();
			props.GetAllToolRequests();
		}}/>
		<DeleteToolRequest show={ShowDeleteToolRequest} handleClose={() => {
			SetDeleteToolRequest(null);
			GetWOEvents();
			props.GetAllToolRequests();
		}}/>
		<EditToolRequest show={ShowEditToolRequest} handleClose={() => {
			SetEditToolRequest(null);
			GetWOEvents();
			props.GetAllToolRequests();
		}}/>
		<AddPost event={Event} show={ShowAddPost} handleClose={() => {
			SetAddPost(false);
			GetEvent();
			GetWOEvents();
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
