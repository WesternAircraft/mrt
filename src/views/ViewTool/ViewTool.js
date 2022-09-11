import styles from './ViewTool.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import {useEffect, useState} from "react";
import NetworkAdapter from "../../api/NetworkAdapter";
import EditTool from "../../modals/EditTool/EditTool";
import EditToolWarranty from "../../modals/EditToolWarranty/EditToolWarranty";

const ViewTool = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Tool, SetTool] = useState({});
	const [ShowEditTool, SetEditTool] = useState(false);
	const [ShowEditToolWarranty, SetEditToolWarranty] = useState(false);

	const GetTool = async () => {
		const result = await NETWORK_ADAPTER.get('/MRT/get-tool/' + props.match.params.id);
		if (result.code === 200) {
			SetTool({...result.payload});
			return;
		}
		console.log(result.message)
	}

	useEffect(() => {
		GetTool();
	}, []);

	return <PageWrapper>
		<div className={styles.viewTool}>
			<div className={styles.column}>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Tool Information</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditTool(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Name</div>
							<div className={styles.num}>{Tool.name}</div>
						</div>
						<div className={styles.long}>
							<div className={styles.label}>Description</div>
							<div className={styles.num}>{Tool.description}</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Make</div>
							<div className={styles.num}>
								{
									Tool.make
										? Tool.make
										: "-"
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Model</div>
							<div className={styles.num}>
								{
									Tool.model
										? Tool.model
										: "-"
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Year</div>
							<div className={styles.num}>
								{
									Tool.year
										? Tool.year
										: "-"
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Serial Number</div>
							<div className={styles.num}>
								{
									Tool.serial_number
										? Tool.serial_number
										: "-"
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Registration Number</div>
							<div className={styles.num}>
								{
									Tool.registration_number
										? Tool.registration_number
										: "-"
								}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>
						<div>Tool Warranty</div>
						<i
							className="fa-regular fa-pen-to-square"
							onClick={() => SetEditToolWarranty(true)}
						/>
					</div>
					<div className={styles.list}>
						<div className={styles.information}>
							<div className={styles.label}>Warranty Contact</div>
							<div className={styles.num}>
								{
									Tool.warranty_contact
										? Tool.warranty_contact
										: "-"
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Number</div>
							<div className={styles.num}>
								{
									Tool.contact_number
										? Tool.contact_number
										: "-"
								}
							</div>
						</div>
						<div className={styles.information}>
							<div className={styles.label}>Contact Email</div>
							<div className={styles.num}>
								{
									Tool.contact_email
										? Tool.contact_email
										: "-"
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.column}></div>
			<div className={styles.column}></div>
			<div className={styles.column}></div>
			<div className={styles.column}></div>
		</div>
		<EditTool tool={Tool} show={ShowEditTool} handleClose={() => {
			SetEditTool(false);
			GetTool();
		}}/>
		<EditToolWarranty tool={Tool} show={ShowEditToolWarranty} handleClose={() => {
			SetEditToolWarranty(false);
			GetTool();
		}}/>
	</PageWrapper>
}

export default ViewTool;