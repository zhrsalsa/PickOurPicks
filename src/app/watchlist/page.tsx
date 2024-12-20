// src/app/watchlist/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./watchlist.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSession } from "next-auth/react";

type Drama = {
  id: number;
  title: string;
  episode: number;
  genre: string;
  platform: string;
  poster: string;
  status: string;
  trope: string;
  year: number;
};

const Watchlist = () => {
  const router = useRouter();
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const { data: session } = useSession(); // Now works because SessionProvider wraps this component

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await fetch("/api/dramas");
        if (!response.ok) {
          throw new Error("Failed to fetch dramas");
        }
        const data = await response.json();
        setDramas(data);
      } catch (error) {
        console.error("Error fetching dramas:", error);
      }
    };

    fetchDramas();
  }, []);

  const handleDramaClick = (drama: Drama) => {
    setSelectedDrama(drama);
  };

  const closePopup = () => {
    setSelectedDrama(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  const handleRecommendationClick = () => {
    router.push("/recommendation");
  };

  const handleWatchlistClick = () => {
    router.push("/watchlist");
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const defaultTropeFilter = dramas.filter((drama) =>
    drama.trope?.toLowerCase().includes("enemies to lovers")
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/headerimg.png" alt="Pick Our Picks" width={65} height={20} priority />
        <div className={styles.headerButtons}>
          <button className={styles.recommendationButton} onClick={handleRecommendationClick}>
            Recommendation
          </button>
          <button className={styles.watchlistButton} onClick={handleWatchlistClick}>
            Watchlist
          </button>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="px-8 py-12">
        <div className={styles["main-sec"]}>
          <h1 className={styles.title}>            
            {session?.user?.name || "User"}'s Watchlist
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
