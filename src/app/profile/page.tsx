'use client';

import React, { useState } from 'react';
import styles from "./profile.module.css";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
  const [username, setUsername] = useState('@user');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  const handleRecommendationClick = () => {
    router.push("/recommendation");
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen p-6">
        <header className={styles.header}>
      <button onClick={() => router.push("/homepage")} className={styles.headerImageButton}>
          <img src="/headerimg.png" alt="Pick Our Picks" width={65} height={20} />
      </button>
        <div className={styles.headerButtons}>
          <button className={styles.recommendationButton} onClick={handleRecommendationClick}>
            Recommendation
          </button>
          <button className={styles.recommendationButton} onClick={() => router.push("/profile")}>
            Profile
          </button>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      {/* Profile Section */}
      <div className={styles.profileContainer}>
        <div className={styles.profileImage}></div>
        {isEditing ? (
          <form onSubmit={handleSave} className="mt-2 flex items-center">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className={styles.usernameInput}
            />
            <button type="submit" className={styles.usernameButton}>Save</button>
          </form>
        ) : (
          <div className="mt-2 flex items-center">
            <span className={styles.usernameDisplay}>{username}</span>
            <button onClick={handleEdit} className="ml-2 text-gray-400">✏️</button>
          </div>
        )}
      </div>
      
      {/* Watchlist Section */}
      <div className={styles.watchlistContainer}>
        <h2 className={styles.watchlistHeader}>User’s Watchlist</h2>
        <div className={styles.watchlistItems}>
          <div className={styles.watchlistItem}></div>
          <div className={styles.watchlistItem}></div>
          <div className={styles.watchlistItem}></div>
        </div>
      </div>
    </div>
  );
}