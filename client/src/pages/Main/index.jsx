import styles from "./styles.module.css";
import PageMain from "../../components/Pages/Main/index.tsx";
import React from 'react';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Home Pages</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<PageMain/>
		</div>
	);
};

export default Main;
