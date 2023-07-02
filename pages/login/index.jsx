import React from "react";
import Grid from "@mui/system/Unstable_Grid";
import { Container } from "@mui/system";
import styles from "./login.module.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth.js";
import { useState, useEffect } from "react";

const index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { session } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_LOGIN}`, {
        username,
        password,
      });

      const token = response.data.token;
      sessionStorage.setItem("token", token);
      console.log("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    // Oturum (session) dolu ise dashboard sayfasına yönlendir
    if (session) {
      router.push("/dashboard");
    }
  });

  return (
    <div className={styles.loginPage}>
      <Container>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid xs={12}>
            <div className={styles.loginForm}>
              <div className={styles.formLogin}>
                <div className={styles.titleContent}>
                  <div className={styles.line}></div>
                  <h1 className={styles.title}>MANAGE COURSES</h1>
                </div>
                <label className={styles.subTitle}>Sign In</label>
                <p className={styles.account}>
                  Enter your credentials to access your account
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formİtem}>
                    <label className={styles.labelSub}>Email</label>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className={styles.formİtem}>
                    <label className={styles.labelSub}>Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className={styles.btnSubmit}>
                    SIGN IN
                  </button>
                </form>
                <div className={styles.resetPassword}>
                  <p>
                    Forgot your password? <a href="#">Reset Password</a>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default index;
