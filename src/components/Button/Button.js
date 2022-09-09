import styles from './Button.module.sass';
import PropTypes from "prop-types";

const Button = (props) => {
	return <div className={styles.button}
	            style={{backgroundColor: props.color, padding: props.long ? '10px 30px' : '10px 10px'}}
	            onClick={() => props.handleClick()}
	>
		{props.children}
	</div>
}

Button.propTypes = {
	color: PropTypes.string.isRequired,
	long: PropTypes.bool,
	handleClick: PropTypes.func.isRequired
}

export default Button;