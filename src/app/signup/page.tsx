"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.pageContainer}>
      <Link href="/">
        <Image
          src="/headerimg.png" // Pastikan nama file dan path sesuai
          alt="Pick Our Picks"
          width={65} // Atur lebar sesuai kebutuhan
          height={20} // Atur tinggi sesuai kebutuhan
          priority
          className={styles.headerImage}
        />
      </Link>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.togglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
          <p className={styles.redirect}>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Pick Our Picks</p>
      </footer>
    </div>
  );
}
