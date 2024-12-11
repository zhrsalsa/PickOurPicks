'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./signup.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement)?.value.trim();
    const email = (document.getElementById("email") as HTMLInputElement)?.value.trim();
    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value;

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.find((user: { email: string }) => user.email === email);
    if (userExists) {
      alert("Email is already registered. Please log in or use another email.");
      return;
    }

    const newUser = {
      id: new Date().getTime().toString(), 
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("New user registered:", newUser); 

    try {
      const result = await signIn("credentials", {
        email,
        password,
        users: JSON.stringify(users), 
        redirect: false,
      });

      if (result?.error) {
        console.error("Error during auto-login:", result.error);
        alert("An error occurred during login. Please try to log in manually.");
        router.push("/login");
        return;
      }

      alert("Signup successful! Redirecting to homepage...");
      router.push("/homepage");
    } catch (error) {
      console.error("Error during auto-login:", error);
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
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                />
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
