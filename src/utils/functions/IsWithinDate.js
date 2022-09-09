import moment from "moment-timezone";

const IsWithinDate = (date, s, e) => {
	const start = moment().tz("America/Boise").subtract(s, 'days');
	const end = moment().tz("America/Boise").subtract(e, 'days');
	return moment(date).tz("America/Boise").isBetween(start, end);
}

export default IsWithinDate;