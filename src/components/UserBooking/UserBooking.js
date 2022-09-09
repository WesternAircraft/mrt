import styles from './UserBooking.module.sass';
import PropTypes from "prop-types";

const UserBooking = (props) => {
	return <div className={styles.userBooking}
	            style={{
		            marginLeft: ((props.index * 2) * 7.2) - ((props.index * 2) * 0.054) + '%',
		            width: ((props.index + 4) * 7.2) - ((props.index + 4) * 0.1) + '%'
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
}

UserBooking.propTypes = {
	index: PropTypes.number.isRequired
}

export default UserBooking;