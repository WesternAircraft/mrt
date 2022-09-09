import styles from './FullModal.module.sass';
import PropTypes from "prop-types";

const FullModal = (props) => {
	return <div className={styles.fullModal}>
		<div className={styles.background} style={{
			opacity: props.show ? 0.8 : 0
		}}/>
		<div className={styles.overlay} style={{
			top: props.show ? '10vh' : '-100vh',
		}}
		>
			<div className={styles.topBar}>
				<i className="fa-regular fa-x" onClick={() => props.handleClose()}/>
			</div>
			{props.children}
		</div>

	</div>
}

FullModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
}

export default FullModal;