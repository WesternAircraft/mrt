import styles from "./select_airplane.module.sass";
import Select from 'react-select'
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const SelectAirplane = (props) => {

	const [Options, SetOptions] = useState([]);

	const customStyles = {
		option: provided => ({
			...provided,
			color: 'black'
		}),
		control: provided => ({
			...provided,
			color: 'black'
		}),
		singleValue: provided => ({
			...provided,
			color: 'black'
		})
	}

	useEffect(() => {
		const temp = [];
		props.AirplanesReducer.Airplanes.forEach((mem) => {
			temp.push({value: mem._id, label: mem.tail_number});
		});
		SetOptions([...temp]);
	}, [props.AirplanesReducer.Airplanes])

	return <Select options={Options} placeholder={"Select Airplane"} styles={customStyles}
	               onChange={props.handleChange}/>
}

SelectAirplane.propTypes = {
	handleChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		AirplanesReducer: state.AirplanesReducer
	};
};

export default connect(mapStateToProps)(SelectAirplane);
