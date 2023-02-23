import styles from "./select_technician.module.sass";
import Select from 'react-select'
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const SelectTechnician = (props) => {

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
		props.UsersReducer.TeamMembers.filter((mem) => mem.team !== undefined).forEach((mem) => {
			temp.push({value: mem._id, label: mem.name});
		});
		SetOptions([...temp]);
	}, [props.UsersReducer.TeamMembers])

	return <Select options={Options} placeholder={"Select Technician"} styles={customStyles}
	               onChange={props.handleChange}/>
}

SelectTechnician.propTypes = {
	handleChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps)(SelectTechnician);
