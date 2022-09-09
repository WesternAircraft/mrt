import styles from './Modal.module.sass';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const Modal = (props) => {

	const [Offset, SetOffset] = useState(0);

	useEffect(() => {
		if (props.show) {
			SetOffset(window.scrollY);
		} else {
			SetOffset(0);
		}
	}, [props.show])

	return <div className={styles.modal} style={{top: Offset + 'px'}}>
		<div className={styles.background} style={{
			opacity: props.show ? 0.8 : 0
		}}/>
		<div className={styles.overlay} style={{
			top: props.show ? '30%' : '-100vh',
		}}
		>
			<div className={styles.topBar}>
				<i className="fa-regular fa-x" onClick={() => props.handleClose()}/>
			</div>
			{props.children}
		</div>

	</div>
}

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
}

export default Modal;