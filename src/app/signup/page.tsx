"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "An error occurred. Please try again.");
        return;
      }

      alert("Signup successful! Redirecting to login page...");
      router.push("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Link href="/">
        <Image
          src="/headerimg.png"
          alt="Pick Our Picks"
          width={65}
          height={20}
          priority
          className={styles.headerImage}
        />
      </Link>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSignup}>
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
              <div className={styles.passwordContainer}>
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className={styles.passwordContainer}>
                <input
                  className={styles.input}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  required
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
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
