"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link"; // Sudah di-import
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        users: JSON.stringify(users), 
        redirect: false,
      });

      console.log("Login result:", result);

      if (result?.error) {
        alert("Invalid email or password. Please try again.");
        return;
      }

      alert("Login successful! Redirecting to homepage...");
      router.push("/homepage");
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
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
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
          <p className={styles.redirect}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Pick Our Picks</p>
      </footer>
    </div>
  );
}
