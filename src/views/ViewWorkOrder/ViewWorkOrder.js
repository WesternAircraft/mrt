import styles from './ViewWorkOrder.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import LinkTechnician from "../../modals/LinkTechnician/LinkTechnician";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import DeleteLinkedTechnician from "../../modals/DeleteLinkedTechnician/DeleteLinkedTechnician";
import LinkAirplane from "../../modals/LinkAirplane/LinkAirplane";
import DeleteLinkedAirplane from "../../modals/DeleteLinkedAirplane/DeleteLinkedAirplane";

const ViewWorkOrder = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [WorkOrder, SetWorkOrder] = useState({});
	const [ShowEditTool, SetEditTool] = useState(false);
	const [ShowEditToolWarranty, SetEditToolWarranty] = useState(false);
	const [ShowLinkTechnician, SetLinkTechnician] = useState(false);
	const [ShowUnLinkTechnician, SetUnLinkTechnician] = useState(false);
	const [ShowLinkAirplane, SetLinkAirplane] = useState(false);
	const [ShowUnLinkAirplane, SetUnLinkAirplane] = useState(false);

	const GetWorkOrder = async () => {
		const result = await NETWORK_ADAPTER.get('/MRT/get-work-order/' + props.match.params.id);
		if (result.code === 200) {
			SetWorkOrder({...result.payload});
			return;
		}
		console.log(result.message)
	}

	useEffect(() => {
		GetWorkOrder();
	}, []);

	return <PageWrapper>
		<div className={styles.viewTool}>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Work Order Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditTool(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Number</div>
							<div className={styles.num}>
								{
									WorkOrder.number
										? WorkOrder.number
										: "-"
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Scheduling</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditTool(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Number</div>
							<div className={styles.num}>
								{
									WorkOrder.number
										? WorkOrder.number
										: "-"
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>Technician</div>
					<div className={styles.list}>
						<div className={styles.information}>
							{
								WorkOrder.technician
									? <div className={styles.link}>
										<div className={styles.information}>
											<div className={styles.label}>Technician</div>
											<div className={styles.num}>
												{WorkOrder.technician.name}
											</div>
										</div>
										<div className={styles.icons}>
											<i
												className="fa-regular fa-trash-can"
												onClick={() => SetUnLinkTechnician(true)}
											/>
										</div>
									</div>
									: <ButtonBar position={'center'}>
										<Button color={'#417eeb'} handleClick={() => SetLinkTechnician(true)}>Link
											Technician</Button>
									</ButtonBar>
							}
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>Airplane</div>
					<div className={styles.list}>
						<div className={styles.information}>
							{
								WorkOrder.airplane
									? <div className={styles.link}>
										<div className={styles.information}>
											<div className={styles.label}>Airplane</div>
											<div className={styles.num}>
												{WorkOrder.airplane.tail_number}
											</div>
										</div>
										<div className={styles.icons}>
											<i
												className="fa-regular fa-trash-can"
												onClick={() => SetUnLinkAirplane(true)}
											/>
										</div>
									</div>
									: <ButtonBar position={'center'}>
										<Button color={'#417eeb'} handleClick={() => SetLinkAirplane(true)}>Link
											Airplane</Button>
									</ButtonBar>
							}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>Tools</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Number</div>
							<div className={styles.num}>
								{
									WorkOrder.number
										? WorkOrder.number
										: "-"
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>Actions</div>
					<div className={styles.list}>
					</div>
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Notes</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditTool(true)}
						/>
					</div>
					<div className={styles.list}>
						<div>{WorkOrder.notes}</div>
					</div>
				</div>
			</div>
		</div>
		<LinkTechnician workOrder={WorkOrder} show={ShowLinkTechnician} handleClose={() => {
			SetLinkTechnician(false);
			GetWorkOrder();
		}}/>
		<DeleteLinkedTechnician workOrder={WorkOrder} show={ShowUnLinkTechnician} handleClose={() => {
			SetUnLinkTechnician(false);
			GetWorkOrder();
		}}/>
		<LinkAirplane workOrder={WorkOrder} show={ShowLinkAirplane} handleClose={() => {
			SetLinkAirplane(false);
			GetWorkOrder();
		}}/>
		<DeleteLinkedAirplane workOrder={WorkOrder} show={ShowUnLinkAirplane} handleClose={() => {
			SetUnLinkAirplane(false);
			GetWorkOrder();
		}}/>
		{/*<EditTool tool={Tool} show={ShowEditTool} handleClose={() => {*/}
		{/*	SetEditTool(false);*/}
		{/*	GetTool();*/}
		{/*}}/>*/}
		{/*<EditToolWarranty tool={Tool} show={ShowEditToolWarranty} handleClose={() => {*/}
		{/*	SetEditToolWarranty(false);*/}
		{/*	GetTool();*/}
		{/*}}/>*/}
	</PageWrapper>
}

export default ViewWorkOrder;