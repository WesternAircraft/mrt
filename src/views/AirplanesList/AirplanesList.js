import styles from './AirplanesList.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useState} from "react";
import AddAirplane from "../../modals/AddAirplane/AddAirplane";
import {GetAllAirplanes} from "../../redux/actions/GetAllAirplanes";
import {connect} from "react-redux";
import DeleteAirplane from "../../modals/DeleteAirplane/DeleteAirplane";
import {Link} from "react-router-dom";

const AirplanesList = (props) => {

	const [ShowAddAirplane, SetAddAirplane] = useState(false);
	const [ShowDeleteAirplane, SetDeleteAirplane] = useState(null);

	return <PageWrapper>
		<div className={styles.airplanesList}>
			<ButtonBar position={'right'}>
				<Button color={'#14394c'} handleClick={() => SetAddAirplane(true)}>Add Airplane</Button>
			</ButtonBar>
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.small}/>
					<div className={styles.long}>Tail Number</div>
					<div className={styles.long}>Serial Number</div>
					<div className={styles.long}>Company Name</div>
					<div className={styles.long}>Primary Contact</div>
					<div className={styles.long}>Contact Phone</div>
					<div className={styles.long}>Contact Email</div>
					<div className={styles.small}/>
				</div>
				{
					props.AirplanesReducer.Airplanes.map((airplane, index) => {
						return <div className={styles.item}>
							<div className={styles.small}>#{index + 1}</div>
							<div className={styles.long}>{airplane.tail_number}</div>
							<div className={styles.long}>{airplane.serial_number}</div>
							<div className={styles.long}>
								{
									airplane.company_name
										? airplane.company_name
										: '-'
								}
							</div>
							<div className={styles.long}>
								{
									airplane.primary_contact
										? airplane.primary_contact
										: '-'
								}
							</div>
							<div className={styles.long}>
								{
									airplane.primary_contact_phone
										? airplane.primary_contact_phone
										: '-'
								}
							</div>
							<div className={styles.long}>
								{
									airplane.primary_contact_email
										? airplane.primary_contact_email
										: '-'
								}
							</div>
							<div className={styles.icons}>
								<i
									className={[styles.trash, " fa-solid fa-trash-can"].join(' ')}
									onClick={() => SetDeleteAirplane(airplane._id)}
								/>
								<Link to={'/airplanes/' + airplane._id}>
									<i className="fa-regular fa-pen-to-square"/>
								</Link>
							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddAirplane show={ShowAddAirplane} handleClose={() => {
			SetAddAirplane(false);
			props.GetAllAirplanes();
		}}/>
		<DeleteAirplane show={ShowDeleteAirplane} handleClose={() => {
			SetDeleteAirplane(null);
			props.GetAllAirplanes();
		}}/>
	</PageWrapper>
}

const mapStateToProps = (state) => {
	return {
		AirplanesReducer: state.AirplanesReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		GetAllAirplanes: () => dispatch(GetAllAirplanes())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AirplanesList);