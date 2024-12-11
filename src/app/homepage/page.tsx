// page.tsx for homepage

import React from "react";
import styles from "./homepage.module.css";

const Homepage = () => {
  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <h1>Pick Our Picks</h1>
        <img
          src="/profile-icon.png"
          alt="Profile Icon"
          className={styles.profileIcon}
        />
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Search Section */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search for your favorite trope..."
            className={styles.searchBar}
          />
        </section>

        {/* Popular Tropes */}
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