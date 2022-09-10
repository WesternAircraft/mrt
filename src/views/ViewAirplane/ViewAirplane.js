import styles from './ViewAirplane.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import EditAirplaneInformation from "../../components/EditAirplaneInformation/EditAirplaneInformation";
import EditCustomerContactInformation
	from "../../components/EditCustomerContactInformation/EditCustomerContactInformation";
import EditGeneralWarranty from "../../components/EditGeneralWarranty/EditGeneralWarranty";
import EditEngineOne from "../../components/EditEngineOne/EditEngineOne";
import EditEngineTwo from "../../components/EditEngineTwo/EditEngineTwo";

const ViewAirplane = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Airplane, SetAirplane] = useState({});
	const [ShowEditAirplane, SetShowEditAirplane] = useState(false);
	const [ShowEditCustomerContactInformation, SetEditCustomerContactInformation] = useState(false);
	const [ShowEditGeneralWarranty, SetEditGeneralWarranty] = useState(false);
	const [ShowEditEngineOne, SetEditEngineOne] = useState(false);
	const [ShowEditEngineTwo, SetEditEngineTwo] = useState(false);

	const GetAirplane = async () => {
		const result = await NETWORK_ADAPTER.get('/MRT/get-airplane/' + props.match.params.id);
		if (result.code === 200) {
			SetAirplane({...result.payload});
			return;
		}
		console.log(result.message)
	}

	useEffect(() => {
		GetAirplane();
	}, []);

	return <PageWrapper>
		<div className={styles.viewAirplane}>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Airplane Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetShowEditAirplane(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Tail Number</div>
							<div className={styles.num}>
								{
									Airplane.tail_number
										? Airplane.tail_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.serial_number
										? Airplane.serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.make
										? Airplane.make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.model
										? Airplane.model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Year</div>
							<div className={styles.num}>
								{
									Airplane.year
										? Airplane.year
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Customer Contact Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditCustomerContactInformation(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Company Name</div>
							<div className={styles.num}>
								{
									Airplane.company_name
										? Airplane.company_name
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Primary Contact</div>
							<div className={styles.num}>
								{
									Airplane.primary_contact
										? Airplane.primary_contact
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Primary Contact Phone</div>
							<div className={styles.num}>
								{
									Airplane.primary_contact_phone
										? Airplane.primary_contact_phone
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Primary Contact Email</div>
							<div className={styles.num}>
								{
									Airplane.primary_contact_email
										? Airplane.primary_contact_email
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>General Warranty Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditGeneralWarranty(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Program</div>
							<div className={styles.num}>{
								Airplane.gw_program
									? Airplane.gw_program
									: '-'
							}</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contract #</div>
							<div className={styles.num}>
								{
									Airplane.gw_contract_number
										? Airplane.gw_contract_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Phone</div>
							<div className={styles.num}>
								{
									Airplane.gw_contact_phone
										? Airplane.gw_contact_phone
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Email</div>
							<div className={styles.num}>
								{
									Airplane.gw_contact_email
										? Airplane.gw_contact_email
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Special Contract Type</div>
							<div className={styles.num}>
								{
									Airplane.special_contract_type
										? Airplane.special_contract_type
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Special Contract Number</div>
							<div className={styles.num}>
								{
									Airplane.special_contract_number
										? Airplane.special_contract_number
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Engine #1 Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditEngineOne(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.engine_one_make
										? Airplane.engine_one_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.engine_one_model
										? Airplane.engine_one_model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.engine_one_serial_number
										? Airplane.engine_one_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.engine_one_cycles
										? Airplane.engine_one_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Engine #2 Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditEngineTwo(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.engine_two_make
										? Airplane.engine_two_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>{
								Airplane.engine_two_model
									? Airplane.engine_two_model
									: '-'
							}</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.engine_two_serial_number
										? Airplane.engine_two_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.engine_two_cycles
										? Airplane.engine_two_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Engine #3 Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.engine_three_make
										? Airplane.engine_three_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.engine_three_model
										? Airplane.engine_three_model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.engine_three_serial_number
										? Airplane.engine_three_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.engine_three_cycles
										? Airplane.engine_three_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Engine Warranty Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Program</div>
							<div className={styles.num}>
								{
									Airplane.engine_warranty_program
										? Airplane.engine_warranty_program
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contract #</div>
							<div className={styles.num}>
								{
									Airplane.engine_contract_number
										? Airplane.engine_contract_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Phone</div>
							<div className={styles.num}>
								{
									Airplane.engine_contact_phone
										? Airplane.engine_contact_phone
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Email</div>
							<div className={styles.num}>
								{
									Airplane.engine_contact_email
										? Airplane.engine_contact_email
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>APU #1 Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.apu_one_make
										? Airplane.apu_one_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.apu_one_model
										? Airplane.apu_one_model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.apu_one_serial_number
										? Airplane.apu_one_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.apu_one_cycles
										? Airplane.apu_one_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>APU #2 Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.apu_two_make
										? Airplane.apu_two_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.apu_two_model
										? Airplane.apu_two_model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.apu_two_serial_number
										? Airplane.apu_two_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.apu_two_cycles
										? Airplane.apu_two_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>APU #3 Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.apu_three_make
										? Airplane.apu_three_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.apu_three_model
										? Airplane.apu_three_model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.apu_three_serial_number
										? Airplane.apu_three_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.apu_three_cycles
										? Airplane.apu_three_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>APU Warranty Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Program</div>
							<div className={styles.num}>
								{
									Airplane.apu_warranty_program
										? Airplane.apu_warranty_program
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contract #</div>
							<div className={styles.num}>
								{
									Airplane.apu_warranty_contract_number
										? Airplane.apu_warranty_contract_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Phone</div>
							<div className={styles.num}>
								{
									Airplane.apu_contact_phone
										? Airplane.apu_contact_phone
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Email</div>
							<div className={styles.num}>
								{
									Airplane.apu_contact_email
										? Airplane.apu_contact_email
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Airframe Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Airplane.airframe_make
										? Airplane.airframe_make
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Airplane.airframe_model
										? Airplane.airframe_model
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Airplane.airframe_serial_number
										? Airplane.airframe_serial_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Latest Cycles</div>
							<div className={styles.num}>
								{
									Airplane.airframe_cycles
										? Airplane.airframe_cycles
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Airframe Warranty Information</div>
						<i className="fa-regular fa-pen-to-square"/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Program</div>
							<div className={styles.num}>
								{
									Airplane.airframe_warranty_program
										? Airplane.airframe_warranty_program
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contract #</div>
							<div className={styles.num}>
								{
									Airplane.airframe_warranty_contract_number
										? Airplane.airframe_warranty_contract_number
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Phone</div>
							<div className={styles.num}>
								{
									Airplane.airframe_warranty_phone
										? Airplane.airframe_warranty_phone
										: '-'
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Email</div>
							<div className={styles.num}>
								{
									Airplane.airframe_warranty_email
										? Airplane.airframe_warranty_email
										: '-'
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			{
				Airplane && Airplane._id
					? <div>
						<EditAirplaneInformation
							show={ShowEditAirplane}
							airplane={Airplane}
							handleClose={() => {
								SetShowEditAirplane(false);
								GetAirplane();
							}}
						/>
						<EditCustomerContactInformation
							show={ShowEditCustomerContactInformation}
							airplane={Airplane}
							handleClose={() => {
								SetEditCustomerContactInformation(false);
								GetAirplane();
							}}
						/>
						<EditGeneralWarranty
							show={ShowEditGeneralWarranty}
							airplane={Airplane}
							handleClose={() => {
								SetEditGeneralWarranty(false);
								GetAirplane();
							}}
						/>
						<EditEngineOne
							show={ShowEditEngineOne}
							airplane={Airplane}
							handleClose={() => {
								SetEditEngineOne(false);
								GetAirplane();
							}}
						/>
						<EditEngineTwo
							show={ShowEditEngineTwo}
							airplane={Airplane}
							handleClose={() => {
								SetEditEngineTwo(false);
								GetAirplane();
							}}
						/>
					</div>
					: null
			}
		</div>
	</PageWrapper>
}

export default ViewAirplane;