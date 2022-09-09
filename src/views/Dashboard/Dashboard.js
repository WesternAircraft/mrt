import styles from './Dashboard.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import moment from "moment-timezone";
import GenerateCalendarDays from "../../utils/functions/SetCalendarDays";
import UserBooking from "../../components/UserBooking/UserBooking";

const Dashboard = (props) => {

	const [CalendarDays, SetCalendarDays] = useState([]);

	useEffect(() => {
		SetCalendarDays(GenerateCalendarDays(moment(), 14));
	}, []);

	return <PageWrapper>
		<div className={styles.dashboard}>
			<div className={styles.grid}>
				<div className={styles.spacer}/>
				<div className={styles.days}>
					{
						CalendarDays.map((day, index) => {
							return <div
								className={[index === (CalendarDays.length - 1) ? styles.lastDay : '', styles.day].join(" ")}>
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
					['', '', ''].map((user) => {
						return <div className={styles.user}>
							<div className={styles.name}>Geoff Schaller</div>
							<div className={styles.events}>
								{
									['', '', '', ''].map((event, index) => {
										return <UserBooking index={index}/>
									})
								}

							</div>
						</div>
					})
				}
			</div>
		</div>
	</PageWrapper>
}

export default Dashboard;