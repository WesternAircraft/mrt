import styles from './Dashboard.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import moment from "moment-timezone";
import GenerateCalendarDays from "../../utils/functions/SetCalendarDays";

const Dashboard = (props) => {

	const [CalendarDays, SetCalendarDays] = useState([]);

	const Images = [
		"https://media.timeout.com/images/105483066/750/422/image.jpg",
		"https://www.worldatlas.com/upload/67/1a/99/shutterstock-507304141.jpg",
		"https://a.cdn-hotels.com/gdcs/production84/d258/5afa5057-4b95-4835-a6e5-f80f2ae14c71.jpg",
		"https://www.ppic.org/wp-content/uploads/sacramento-tower-bridge-and-sacramento-capitol-mall.jpg"
	]

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
										return <div className={styles.event}
										            style={{
											            marginLeft: ((index * 2) * 7.2) - ((index * 2) * 0.054) + '%',
											            width: ((index + 4) * 7.2) - ((index + 4) * 0.1) + '%'
										            }}
										>
											<div className={styles.dates}>
												<div>09/09/2022</div>
												<div className={styles.arrow}>
													<div className={styles.line}/>
													<i className="fa-solid fa-caret-right"/>
												</div>
												<div>09/12/2022</div>
											</div>
											<div className={styles.information}>
												<div className={styles.city}>
													<div className={styles.info}>Las Vegas</div>
													<div className={styles.info}>N12345</div>
												</div>
												<div className={styles.icons}>
													<i className={[styles.alert, " fa-solid fa-triangle-exclamation"].join(' ')}/>
													<i className="fa-regular fa-plane"/>
													<i className="fa-regular fa-folders"/>
													<i className="fa-regular fa-receipt"/>
													<i className="fa-regular fa-wrench"/>
													<i className="fa-solid fa-pen-to-square"/>
													<i className={[styles.trash, " fa-regular fa-trash-can"].join(' ')}/>
												</div>
											</div>

										</div>
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