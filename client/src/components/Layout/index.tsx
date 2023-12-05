import React from 'react';
// import styles from "./styles.module.css";

function PageLayout(props: { children: React.ReactNode }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return <>{props.children}</>
  // return (
  //   <div className={styles.main_container}>
  //     <nav className={styles.navbar}>
  //       <h1>Home Pages</h1>
  //       <button className={styles.white_btn} onClick={handleLogout}>
  //         Logout
  //       </button>
  //     </nav>
  //     {props.children}
  //   </div>
  // );
}

export default PageLayout;