// src/app/homepage/page.tsx
import React from "react";
import Image from "next/image";
import styles from "./homepage.module.css";

const Homepage = () => {
  return (
    <div>
      <header className={styles.header}>
        <Image
          src="/headerimg.png"
          alt="Pick Our Picks"
          width={65}
          height={20}
          priority
        />
        <img
          src="/profile-icon.png"
          alt="Profile Icon"
          className={styles.profileIcon}
        />
      </header>

      <main className={styles.main}>
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search for your favorite trope..."
            className={styles.searchBar}
          />
        </section>

        <section className={styles.popularTropes}>
          <button className={styles.tropeButton}>Enemies to Lovers</button>
          <button className={styles.tropeButton}>Found Family</button>
          <button className={styles.tropeButton}>Time Travel</button>
          <button className={styles.tropeButton}>Second Chance</button>
          <button className={styles.tropeButton}>Forbidden Love</button>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
