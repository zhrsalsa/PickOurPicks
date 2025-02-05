// src/app/homepage/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./homepage.module.css";
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

const Homepage = () => {
  const router = useRouter();
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const { data: session } = useSession();

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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const defaultTropeFilter = dramas.filter((drama) =>
    drama.trope?.toLowerCase().includes("enemies to lovers")
  );

  const friendsToLoversFilter = dramas.filter((drama) =>
    drama.trope?.toLowerCase().includes("friends to lovers")
  );

  const handleStartExplore = () => {
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

      <main className="px-8 py-12">
        <div className={styles["main-sec"]}>
          <h1 className={styles.title}>
            Hi, {session?.user?.name || "User"}!
          </h1>
          <p className={styles.description}>Explore dramas to watch based on trope in the story</p>
          <button className={styles.startExploreButton} onClick={handleStartExplore}>
            Start Explore
          </button>
        </div>

        <section>
          <h2 className={styles.popularTitle}>Popular Tropes</h2>
          <h3 className={styles.tropeTitle}>Enemies to Lovers</h3>
          <Carousel
            responsive={responsive}
            className={styles.carousel}
            swipeable
            draggable
            ssr
            keyBoardControl
            partialVisbile
          >
            {defaultTropeFilter.map((drama) => (
              <div
                key={drama.id}
                className={styles.dramaCard}
                onClick={() => handleDramaClick(drama)}
              >
                <img src={drama.poster} alt={drama.title} className={styles.dramaImage} />
              </div>
            ))}
          </Carousel>
        </section>

        <section>
          <h3 className={styles.tropeTitle}>Friends to Lovers</h3>
          <Carousel
            responsive={responsive}
            className={styles.carousel}
            swipeable
            draggable
            ssr
            keyBoardControl
            partialVisbile
          >
            {friendsToLoversFilter.map((drama) => (
              <div
                key={drama.id}
                className={styles.dramaCard}
                onClick={() => handleDramaClick(drama)}
              >
                <img src={drama.poster} alt={drama.title} className={styles.dramaImage} />
              </div>
            ))}
          </Carousel>
        </section>

        {selectedDrama && (
          <div className={styles.popupOverlay} onClick={closePopup}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedDrama.title}</h2>
              <div className={styles.year}>{selectedDrama.year}</div>
              <div className={styles.genre}>{selectedDrama.genre}</div>
              <div className={styles.platform}>{selectedDrama.platform}</div>
              <div className={styles.trope}>{selectedDrama.trope}</div>
              <p className={styles.episode}>{selectedDrama.episode}</p>
              <div className={styles.watchlistButtonWrapper}>
                <button className={styles.closeButton} onClick={closePopup}>
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
