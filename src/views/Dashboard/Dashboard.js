import styles from './Dashboard.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import moment from "moment-timezone";
import GenerateCalendarDays from "../../utils/functions/SetCalendarDays";
import UserBooking from "../../components/UserBooking/UserBooking";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import AddEvent from "../../modals/AddEvent/AddEvent";
import NetworkAdapter from "../../api/NetworkAdapter";
import UserTimeOff from "../../components/UserTimeOff/UserTimeOff";
import DeleteEvent from "../../modals/DeleteEvent/DeleteEvent";
import TeamA from "../../data/TeamA";
import TeamB from "../../data/TeamB";
import UserVacation from '../../components/UserVacation/UserVacation';

const Dashboard = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [CalendarDays, SetCalendarDays] = useState([]);
	const [Team, SetTeam] = useState([...TeamA]);
	const [Month, SetMonth] = useState("");
	const [ViewAdd, SetViewAdd] = useState(false);
	const [StartDate, SetStartDate] = useState(moment().tz("America/Boise").format("MM-DD-YYYY"));
	const [Events, SetEvents] = useState([]);
	const [ShowDeleteEvent, SetDeleteEvent] = useState("");

	const GetEvents = async () => {
		const results = await NETWORK_ADAPTER.get('/MRT/get-all-events/' + moment(StartDate).format("YYYY-MM-DD"));
		if (results.code === 200) {
			SetEvents([...results.payload]);
			return;
		}
		console.log("Error: " + results.message)
	}

	const ChangeStartDate = (days) => {
		if (days >= 0) {
			SetStartDate(moment(StartDate).tz("America/Boise").add(days, 'days').format("MM-DD-YYYY"));
		} else {
			SetStartDate(moment(StartDate).tz("America/Boise").subtract(days * -1, 'days').format("MM-DD-YYYY"));
		}
	}

	useEffect(() => {
		SetCalendarDays(GenerateCalendarDays(moment(StartDate), 14));
		SetMonth(moment(StartDate).tz("America/Boise").format("MMMM YYYY"));
		GetEvents();
	}, [StartDate]);

	return <PageWrapper>
		<div className={styles.dashboard}>
			<div className={styles.topMenu}>
				<div className={styles.directions}>
					<i
						className="fa-solid fa-angles-left"
						onClick={() => ChangeStartDate(-14)}
					/>
					<div className={styles.month}>{Month}</div>
					<i
						className="fa-solid fa-angles-right"
						onClick={() => ChangeStartDate(14)}
					/>
				</div>
				<div className={styles.teams}>
					<div
						className={[Team[0].id === TeamA[0].id && Team.length !== TeamB.length + TeamA.length ? styles.highlight : '', styles.team].join(' ')}
						onClick={() => SetTeam([...TeamA])}
					>
						Team A
					</div>
					<div
						className={[Team[0].id === TeamB[0].id && Team.length !== TeamB.length + TeamA.length? styles.highlight : '', styles.team].join(' ')}
						onClick={() => SetTeam([...TeamB])}
					>
						Team B
					</div>
					<div
						className={[Team.length === TeamB.length + TeamA.length? styles.highlight : '', styles.team].join(' ')}
						onClick={() => {
							SetTeam([...TeamA, ...TeamB])
						}}
					>
						Combined
					</div>
				</div>
				<div className={styles.addButton}>
					<ButtonBar position={'right'}>
						<Button long handleClick={() => SetViewAdd(true)} color={'#14394c'}>Add Booking</Button>
					</ButtonBar>
				</div>
			</div>
			<div className={styles.grid}>
				<div className={styles.spacer}/>
				<div className={styles.days}>
					{
						CalendarDays.map((day, index) => {
							return <div
								className={[index === (CalendarDays.length - 1) ? styles.lastDay : '', styles.day].join(" ")}
								key={index}
							>
								<div
									className={[day.name === 'Saturday' || day.name === 'Sunday' ? styles.weekend : '', styles.marker].join(' ')}>
									<div>{day.number}</div>
									<div>{day.name}</div>
								</div>
							</div>
						})
					}
				</div>
			</div>
			<div className={styles.users}>
				{
					Team.map((user, index) => {
						return <div className={[index % 2 !== 0 ? styles.even : '', styles.user].join(' ')}
						            key={index}>
							<div className={styles.name}>{user.name}</div>
							<div className={styles.events}>
								{
									Events.filter((e) => {
										return e.technician === user.id;
									}
										).map((event, index) => {
										if(event.type === "booking") {
											return <UserBooking
												index={index}
												key={index}
												event={event}
												startDate={StartDate}
												delete={() => SetDeleteEvent(event._id)}
											/>
										} else if(event.type === "time_off") {
											return <UserTimeOff
												index={index}
												key={index}
												event={event}
												startDate={StartDate}
												delete={() => SetDeleteEvent(event._id)}
											/>
										} else if(event.type === "vacation") {
											return <UserVacation
												index={index}
												key={index}
												event={event}
												startDate={StartDate}
												delete={() => SetDeleteEvent(event._id)}
											/>
										}
									})
								}

							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddEvent show={ViewAdd} handleClose={() => {
			GetEvents();
			SetViewAdd(false)
		}}/>
		<DeleteEvent show={ShowDeleteEvent} handleClose={() => {
			GetEvents();
			SetDeleteEvent("")
		}}/>
	</PageWrapper>
}

export default Dashboard;