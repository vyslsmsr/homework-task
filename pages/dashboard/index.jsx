import React from "react";
import Sidebar from "../../components/sidebar/sidebar.js";
import Headerbar from "../../components/headerbar/headerbar.js";
import Grid from "@mui/system/Unstable_Grid";
import styles from "./dashboard.module.css";
import { RiBriefcase2Line,RiBookmarkLine,RiMoneyDollarBoxLine,RiUserLine  } from "react-icons/ri";
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = ({ children }) => {
  const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            router.push("/");
        }
    });

  return (
    <div className={styles.headerbox}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={3}>
          <Sidebar />
        </Grid>
        <Grid xs={12} md={9}>
          <Headerbar />
          <div className={styles.box}>
            {children || (
                
              <div className={styles.dashboardContent}>
                
                <div className={styles.student}>
                  <div className={styles.studentIcon}>
                    <RiBriefcase2Line className={styles.studentIconColor} />
                    <p>Students</p>
                  </div>
                  <div className={styles.studentCount}>
                    <label>243</label>
                  </div>
                </div>



                <div className={styles.course}>
                  <div className={styles.courseIcon}>
                    <RiBookmarkLine className={styles.courseIconColor} />
                    <p>Course</p>
                  </div>
                  <div className={styles.courseCount}>
                    <label>13</label>
                  </div>
                </div>


                <div className={styles.payments}>
                  <div className={styles.paymentsIcon}>
                    <RiMoneyDollarBoxLine  className={styles.paymentsIconColor} />
                    <p>Payments</p>
                  </div>
                  <div className={styles.paymentsCount}>
                    <label> 556,000₺</label>
                  </div>
                </div>

                <div className={styles.users}>
                  <div className={styles.usersIcon}>
                    <RiUserLine  className={styles.usersIconColor} />
                    <p>Payments</p>
                  </div>
                  <div className={styles.usersCount}>
                    <label>3</label>
                  </div>
                </div>

              </div>
              
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default index;
