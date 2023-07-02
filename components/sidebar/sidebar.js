import React from "react";
import { useState } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { Button } from "antd";
import {
  RiHome8Line,
  RiBriefcase2Line,
  RiBookmarkLine,
  RiMoneyDollarBoxLine,
  RiBarChartBoxLine,
  RiFileSettingsLine,
  RiLoginBoxLine,
  RiMenuFill,
} from "react-icons/ri";
import { useRouter } from "next/router";

const sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const router = useRouter();


  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div
      className={`${styles.content} ${isActive ? styles.contentActive : ""}`}
    >
      <div className={styles.barTitle}>
        <div className={styles.line}></div>
        <h2>MANAGE COURSES</h2>
        <Button onClick={handleClick}>
          <RiMenuFill />
        </Button>
      </div>
      <div className={styles.barImg}>
        <img src="images/profile.png" />
      </div>
      <div className={styles.name}>
        <label>John Doe</label>
        <p>Admin</p>
      </div>
      <div className={styles.menuContent}>
        <div className={styles.menu}>
          <nav>
            <ul className={styles.menuList}>
              <li>
                <Link
                  href="/dashboard" className={router.pathname == "/" ? styles.active : ""}>
                  <RiHome8Line className={styles.icon} /> Home
                </Link>
              </li>
              <li>
                <Link href="/Course">
                  <RiBookmarkLine className={styles.icon} /> Course
                </Link>
              </li>
              <li>
                <Link href="/students">
                  <RiBriefcase2Line className={styles.icon} /> Students
                </Link>
              </li>
              <li>
                <Link href="/payment">
                  <RiMoneyDollarBoxLine className={styles.icon} /> Payment
                </Link>
              </li>
              <li>
                <Link href="/report">
                  <RiBarChartBoxLine className={styles.icon} /> Report
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <RiFileSettingsLine className={styles.icon} /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.menuExit}>
          <ul className={styles.menuList}>
            <li>
              <Link href="/" onClick={handleLogout}>
                Logout <RiLoginBoxLine />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
