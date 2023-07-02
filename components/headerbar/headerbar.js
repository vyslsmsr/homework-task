import React from 'react'

import styles from "./headerbar.module.css";

import { RiPlayCircleLine, RiAlarmWarningLine } from "react-icons/ri";


const headerbar = () => {
  return (
    <div className={styles.headerContent}>
        <RiPlayCircleLine className={styles.icon}/>
        <RiAlarmWarningLine className={styles.iconAlarm}/>
    </div>
  )
}

export default headerbar