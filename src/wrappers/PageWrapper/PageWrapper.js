import styles from './PageWrapper.module.sass';
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {connect} from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

const PageWrapper = (props) => {
	return <div className={styles.pageWrapper}>
		<NavigationBar/>
		<div className={styles.pagePadding}>
			<div className={styles.pageTitle}>Welcome, {props.UsersReducer.AuthedUser.name}</div>
			<BreadCrumbs/>
			{props.children}
		</div>
	</div>
}

const mapStateToProps = (state) => {
	return {
		UsersReducer: state.UsersReducer
	};
};

export default connect(mapStateToProps, null)(PageWrapper);