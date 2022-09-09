import styles from './ButtonBar.module.sass';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const ButtonBar = (props) => {

	const [ButtonFlex, SetButtonFlex] = useState({
		justifyContent: 'flex-start',
	});

	useEffect(() => {
		if (props.position === 'right') {
			SetButtonFlex({justifyContent: 'flex-end'})
		}
		if (props.position === 'center') {
			SetButtonFlex({justifyContent: 'center'})
		}
		if (props.position === 'split') {
			SetButtonFlex({justifyContent: 'space-between'})
		}
	}, []);

	return <div className={styles.buttonBar} style={{...ButtonFlex}}>
		{props.children}
	</div>
}

ButtonBar.propTypes = {
	position: PropTypes.oneOf(['right', 'left', 'center', 'split'])
}

export default ButtonBar;