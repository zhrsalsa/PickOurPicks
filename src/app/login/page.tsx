"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert(result.error);
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
          <form className={styles.form} onSubmit={handleLogin}>
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
                  placeholder="Enter your password"
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
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
          <p className={styles.redirect}>
            Don’t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Pick Our Picks</p>
      </footer>
    </div>
  );
}
