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

const Dashboard = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [CalendarDays, SetCalendarDays] = useState([]);
	const [ViewAdd, SetViewAdd] = useState(false);
	const [StartDate, SetStartDate] = useState(moment().tz("America/Boise").format("MM-DD-YYYY"));
	const [Events, SetEvents] = useState([]);

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
					<i
						className="fa-solid fa-angles-right"
						onClick={() => ChangeStartDate(14)}
					/>
				</div>
				<div className={styles.legend}>
					<div className={styles.item}>
						<i className={[styles.alert, " fa-solid fa-triangle-exclamation"].join(' ')}/>
						<div>= Alert</div>
					</div>
					<div className={styles.item}>
						<i className="fa-regular fa-plane"/>
						<div>= Airplane information</div>
					</div>
					<div className={styles.item}>
						<i className="fa-regular fa-folders"/>
						<div>= Uploaded Files</div>
					</div>
					<div className={styles.item}>
						<i className="fa-regular fa-receipt"/>
						<div>= Work Order</div>
					</div>
					<div className={styles.item}>
						<i className="fa-regular fa-wrench"/>
						<div>= Tooling</div>
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
					['', ''].map((user, index) => {
						return <div className={styles.user} key={index}>
							<div className={styles.name}>Geoff Schaller</div>
							<div className={styles.events}>
								{
									Events.map((event, index) => {
										return <UserBooking
											index={index}
											key={index}
											event={event}
											startDate={StartDate}
										/>
									})
								}

							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddEvent show={ViewAdd} handleClose={() => SetViewAdd(false)}/>
	</PageWrapper>
}

export default Dashboard;