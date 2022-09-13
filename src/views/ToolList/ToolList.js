import styles from './ToolListList.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {connect} from "react-redux";
import AddTool from "../../modals/AddTool/AddTool";
import {GetAllTools} from "../../redux/actions/GetAllTools";
import DeleteTool from "../../modals/DeleteTool/DeleteTool";

const ToolList = (props) => {

	const [ShowAddTool, SetAddTool] = useState(false);
	const [ShowDeleteTool, SetDeleteTool] = useState(null);

	return <PageWrapper>
		<div className={styles.airplanesList}>
			<ButtonBar position={'right'}>
				<Button color={'#14394c'} handleClick={() => SetAddTool(true)}>Add Tool</Button>
			</ButtonBar>
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.small}/>
					<div className={styles.long}>Name</div>
					<div className={styles.extra}>Description</div>
					<div className={styles.small}/>
				</div>
				{
					props.ToolsReducer.Tools.map((tool, index) => {
						return <div className={styles.item}>
							<div className={styles.small}>#{index + 1}</div>
							<div className={styles.long}>{tool.name}</div>
							<div className={styles.extra}>
								{
									tool.description
										? tool.description
										: "-"
								}
							</div>
							<div className={styles.icons}>
								<i
									className={[styles.trash, " fa-solid fa-trash-can"].join(' ')}
									onClick={() => SetDeleteTool(tool._id)}
								/>
								{/*<Link to={'/tooling/' + tool._id}>*/}
								{/*	<i className="fa-regular fa-pen-to-square"/>*/}
								{/*</Link>*/}
							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddTool show={ShowAddTool} handleClose={() => {
			SetAddTool(false);
			props.GetAllTools();
		}}/>
		<DeleteTool show={ShowDeleteTool} handleClose={() => {
			SetDeleteTool(null);
			props.GetAllTools();
		}}/>
	</PageWrapper>
}

const mapStateToProps = (state) => {
	return {
		ToolsReducer: state.ToolsReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		GetAllTools: () => dispatch(GetAllTools())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolList);