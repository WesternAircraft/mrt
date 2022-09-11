import styles from './WorkOrderList.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import AddWorkOrder from "../../modals/AddWorkOrder/AddWorkOrder";
import {GetAllWorkOrders} from "../../redux/actions/GetAllWorkOrders";
import DeleteWorkOrder from "../../modals/DeleteWorkOrder/DeleteWorkOrder";

const WorkOrderList = (props) => {

	const [ShowAddWorkOrder, SetAddWorkOrder] = useState(false);
	const [ShowDeleteWorkOrder, SetDeleteWorkOrder] = useState(null);

	return <PageWrapper>
		<div className={styles.airplanesList}>
			<ButtonBar position={'right'}>
				<Button color={'#14394c'} handleClick={() => SetAddWorkOrder(true)}>Add Work Order</Button>
			</ButtonBar>
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.small}/>
					<div className={styles.long}>Work Order Number</div>
					<div className={styles.long}>Technician</div>
					<div className={styles.long}>Airplane</div>
					<div className={styles.small}/>
				</div>
				{
					props.WorkOrdersReducer.WorkOrders.map((work_order, index) => {
						return <div className={styles.item}>
							<div className={styles.small}>#{index + 1}</div>
							<div className={styles.long}>{work_order.number}</div>
							<div className={styles.long}>
								{
									work_order.technician
										? work_order.technician.name
										: '-'
								}
							</div>
							<div className={styles.long}>
								{
									work_order.airplane
										? work_order.airplane.tail_number
										: '-'
								}
							</div>
							<div className={styles.icons}>
								<i
									className={[styles.trash, " fa-solid fa-trash-can"].join(' ')}
									onClick={() => SetDeleteWorkOrder(work_order._id)}
								/>
								<Link to={'/work-orders/' + work_order._id}>
									<i className="fa-regular fa-pen-to-square"/>
								</Link>
							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddWorkOrder show={ShowAddWorkOrder} handleClose={() => {
			SetAddWorkOrder(false);
			props.GetAllWorkOrders();
		}}/>
		<DeleteWorkOrder show={ShowDeleteWorkOrder} handleClose={() => {
			SetDeleteWorkOrder(null);
			props.GetAllWorkOrders();
		}}/>
	</PageWrapper>
}

const mapStateToProps = (state) => {
	return {
		WorkOrdersReducer: state.WorkOrdersReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		GetAllWorkOrders: () => dispatch(GetAllWorkOrders())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderList);