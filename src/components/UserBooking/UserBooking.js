import styles from './UserBooking.module.sass';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import moment from "moment-timezone";
import {Link} from "react-router-dom";

const UserBooking = (props) => {

	const [Offset, SetOffset] = useState(0);
	const [Width, SetWidth] = useState(4);
	const [LeftFlag, SetLeftFlag] = useState(0);
	const [RightFlag, SetRightFlag] = useState(0);

	const CalculateLeft = () => {
		const CalendarStart = moment(props.startDate);
		const EventStart = moment(props.event.start_date);
		const diff = EventStart.diff(CalendarStart, 'days');
		let Off = diff;
		if (diff < 0) {
			//SetLeftFlag(diff * -1)
			Off = 0;
		}
		SetOffset(Off);
		const EventEnd = moment(props.event.end_date);
		const Duration = EventEnd.diff(EventStart, 'days') + (diff < 0 ? diff : 0) + 1;
		const Overflow = 14 - (Off + Duration);
		if (Overflow < 0) {
			SetWidth(Duration + Overflow);
			//SetRightFlag(Overflow * -1);
		} else {
			SetWidth(Duration)
		}
	}

	useEffect(() => {
		CalculateLeft();
	}, [props.startDate, props.event]);

	return <div className={styles.userBooking}
	            style={{
		            marginLeft: ((Offset) * 7.2) - ((Offset) * 0.054) + '%',
		            width: ((Width) * 7.2) - ((Width) * 0.07) + '%'
	            }}
	>
		<div className={[LeftFlag > 0 ? styles.show : '', styles.leftFlag].join(' ')}>{'+' + LeftFlag}</div>
		<div className={styles.dates}>
			<div>{moment(props.event.start_date).format("MM-DD-YYYY")}</div>
			<div className={styles.arrow}>
				<div className={styles.line}/>
				<i className="fa-solid fa-caret-right"/>
			</div>
			<div>{moment(props.event.end_date).format("MM-DD-YYYY")}</div>
		</div>
		<div className={styles.information}>
			<div className={styles.city}>
				<div className={styles.info}>
					{
						props.event.city
							? props.event.city
							: 'No City Listed'
					}
				</div>
				<div className={styles.tail}>
					{
						props.event.airplane
							? props.event.airplane.tail_number
							: '-'
					}
				</div>
				<div className={styles.tail}>
					{
						props.event.work_order
							? props.event.work_order
							: '-'
					}
				</div>
			</div>
			<div className={styles.icons}>
				{
					props.event.alert
						? <i className={[styles.alert, " fa-solid fa-triangle-exclamation"].join(' ')}/>
						: <i className={["fa-solid fa-triangle-exclamation"].join(' ')}/>
				}
				<Link to={'/' + props.event._id}>
					<i className="fa-solid fa-pen-to-square"/>
				</Link>

				<i
					className={[styles.trash, " fa-regular fa-trash-can"].join(' ')}
					onClick={props.delete}
				/>
			</div>
			<div className={[RightFlag > 0 ? styles.show : '', styles.rightFlag].join(' ')}>{'+' + RightFlag}</div>
		</div>
	</div>
}

UserBooking.propTypes = {
	index: PropTypes.number.isRequired,
	event: PropTypes.object.isRequired,
	delete: PropTypes.func.isRequired
}

export default UserBooking;