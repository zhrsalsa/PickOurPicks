'use client';

import React, { useState, useEffect } from 'react';
import styles from "./profile.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [username, setUsername] = useState('@user');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      const fetchUsername = async () => {
        try {
          const response = await fetch("/api/get-username");
          if (!response.ok) {
            throw new Error("Failed to fetch username");
          }
          const data = await response.json();
          setUsername(data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };
    
      if (session) {
        fetchUsername();
      }
    }, [session]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      try {
        const response = await fetch("/api/update-username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to update username");
        }
    
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating username:", error);
      }
    };    

    const handleLogout = () => {
        console.log("User logged out");
        router.push("/");
    };

    const handleRecommendationClick = () => {
        router.push("/recommendation");
    };

    return (
        <div className={styles.container}>
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
            
            <div className={styles.watchlistContainer}>
                <h2 className={styles.watchlistHeader}>{session?.user?.name}’s Watchlist</h2>
                <div className={styles.watchlistItems}>
                    <div className={styles.watchlistItem}></div>
                    <div className={styles.watchlistItem}></div>
                    <div className={styles.watchlistItem}></div>
                </div>
            </div>
        </div>
    );
}