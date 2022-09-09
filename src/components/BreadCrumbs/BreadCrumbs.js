import {useEffect, useState} from "react";
import styles from "./BreadCrumbs.module.sass";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const BreadCrumbs = (props) => {

	const location = useLocation();
	const [links, setLinks] = useState([]);

	useEffect(() => {
		let paths = location.pathname.split("/");
		paths.splice(0, 1);
		const crumbs = [{
			name: "dashboard",
			link: "/"
		}];
		let aggLink = "/";
		for (let i = 0; i < paths.length; i++) {
			if (paths[i] === "") continue;
			aggLink += paths[i] + "/";
			let temp = {
				name: paths[i].toString(),
				link: aggLink
			};
			crumbs.push(temp);
		}
		setLinks([...crumbs]);
	}, [location]);

	return <div className={styles.breadCrumbs}>
		{
			links.map((link, index) => {
				return <Link to={link.link} key={index}>
					{
						index < links.length - 1 && links.length > 1
							? <div className={styles.crumb}>
								<div className={[styles.name].join(" ")}>{link.name}</div>
								<i className="fa-solid fa-circle-small"/>
							</div>
							: <div className={[styles.name].join(" ")}>{link.name}</div>
					}

				</Link>;
			})
		}
	</div>;
};

export default BreadCrumbs;