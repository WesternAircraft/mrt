import styles from './DocumentList.module.sass';
import PageWrapper from "../../wrappers/PageWrapper/PageWrapper";
import ButtonBar from "../../components/ButtonBar/ButtonBar";
import Button from "../../components/Button/Button";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {GetAllTools} from "../../redux/actions/GetAllTools";
import AddDocument from "../../modals/AddDocument/AddDocument";
import NetworkAdapter from "../../api/NetworkAdapter";
import {NETWORK_ADDRESS} from "../../config/Network";

const DocumentList = (props) => {

	const NETWORK_ADAPTER = new NetworkAdapter();

	const [Documents, SetDocuments] = useState([]);
	const [ShowAddDocument, SetAddDocument] = useState(false);
	const [ShowDeleteDocument, SetDeleteDocument] = useState(false);

	const GetDocuments = async () => {
		const result = await NETWORK_ADAPTER.get('/MRT/get-all-documents');
		if (result.code === 200) {
			SetDocuments([...result.payload])
		}
	}

	useEffect(() => {
		GetDocuments();
	}, [])

	return <PageWrapper>
		<div className={styles.airplanesList}>
			<ButtonBar position={'right'}>
				<Button color={'#14394c'} handleClick={() => SetAddDocument(true)}>Add Document</Button>
			</ButtonBar>
			<div className={styles.table}>
				<div className={styles.header}>
					<div className={styles.small}/>
					<div className={styles.long}>Name</div>
					<div className={styles.extra}>Description</div>
					<div className={styles.small}/>
				</div>
				{
					Documents.map((doc, index) => {
						return <div className={styles.item}>
							<div className={styles.small}>#{index + 1}</div>
							<div className={styles.long}>{doc.name}</div>
							<div className={styles.extra}>
								{
									doc.description
										? doc.description
										: "-"
								}
							</div>
							<div className={styles.icons}>
								<i
									className={[styles.trash, " fa-solid fa-trash-can"].join(' ')}
									onClick={() => SetDeleteDocument(doc._id)}
								/>
								<a href={NETWORK_ADDRESS + "/uploads/mrt/" + doc.file} target={'_blank'}>
									<i className="fa-regular fa-arrow-up-right-from-square"/>
								</a>
							</div>
						</div>
					})
				}
			</div>
		</div>
		<AddDocument show={ShowAddDocument} handleClose={() => {
			SetAddDocument(false);
			GetDocuments();
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);