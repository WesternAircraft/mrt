import moment from "moment-timezone";

const GenerateCalendarDays = (start, days) => {
	const temp = [];
	for (let i = 0; i < days; i++) {
		temp.push({
			number: moment(start).tz("America/Boise").add(i, 'days').format("Do"),
			name: moment(start).tz("America/Boise").add(i, 'days').format("dddd")
		});
	}
	return [...temp];
}

export default GenerateCalendarDays;