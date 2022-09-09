import React, {useState} from "react";
import styles from "./FileDragAndDrop.module.sass";
import axios from "axios";
import {connect} from "react-redux";
import {NETWORK_ADDRESS} from "../../config/Network";

const FileDragAndDrop = (props) => {

	const [draggedOver, setDraggedOver] = useState(false);
	const [files, setFiles] = useState([]);

	const uploadFiles = async (items) => {
		if (!props.UsersReducer.AuthedUser) return;
		if (items) {
			let formData = new FormData();
			for (let i = 0; i < items.length; i++) {
				if (items[i].kind === "file") {
					let file = items[i].getAsFile();
					formData.append(`file_${i}`, file);
				}
			}
			const uploadResult = await axios.post(NETWORK_ADDRESS + "/api/documents/create-revision", formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			console.log(uploadResult);
		}
	};

	return <div className={styles.fileDragAndDrop}>
		<div
			className={[styles.dropZone, draggedOver ? styles.over : null].join(" ")}
			onDragOver={(e) => {
				e.preventDefault();
				setDraggedOver(true);
			}}
			onDrop={(e) => {
				e.preventDefault();
				let temp = [...files];
				temp.push("");
				if (e.dataTransfer.items) {
					uploadFiles(e.dataTransfer.items);
				}
				setDraggedOver(false);
			}}
			onDragLeave={(e) => {
				e.preventDefault();
				setDraggedOver(false);
			}}
		>
			{
				draggedOver
					? <div className={styles.cursorIgnore}>
						<i className="fal fa-thumbs-up"/>
					</div>
					: <div className={styles.cursorIgnore}>
						<i className="fad fa-folders"/>
						<div className={styles.title}>
							<div className={styles.border}/>
							<div className={styles.label}>Drag & Drop</div>
						</div>
						<div className={styles.description}>
							Drag and Drop Documents, Photos, and PDFs here to start uploading.
						</div>
					</div>
			}
		</div>
	</div>;
};

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(FileDragAndDrop);