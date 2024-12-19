/* src/app/homepage/ */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./homepage.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Drama[]>([]);

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await fetch("/api/dramas");
        const data = await response.json();
        setDramas(data);
      } catch (error) {
        console.error("Failed to fetch dramas:", error);
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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Default filter untuk menampilkan 'Enemies to Lovers'
  const defaultTropeFilter = dramas.filter((drama) =>
    drama.trope?.toLowerCase().includes("enemies to lovers")
  );

  // Handle ketika pengguna menekan tombol Enter di input
// Jangan langsung set hasil pencarian, tunggu sampai Enter ditekan
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const results = dramas.filter((drama) =>
        drama.trope?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
      setIsSearching(true); // Indikasikan pencarian sudah dilakukan
    }
  };

  const handleButtonSearch = (trope: string) => {
    setSearchTerm(trope);
    const results = dramas.filter((drama) =>
      drama.trope?.toLowerCase().includes(trope.toLowerCase())
    );
    setFilteredResults(results);
  };  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/headerimg.png" alt="Pick Our Picks" width={65} height={20} priority />
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="px-8 py-12">
        <div className={styles["main-sec"]}>
          <h1 className={styles.title}>Explore dramas to watch based on trope in the story!</h1>
          <p className={styles.description}>You can find different genres with the same trope</p>
          <input
            type="text"
            placeholder="Search your favorite trope..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Tetap update state saat ketik
            onKeyDown={handleSearch} // Deteksi tombol Enter
          />
        </div>

        <section>
          <h2 className={styles.popularTitle}>
            {isSearching ? "Search Results" : "Popular Tropes"}
          </h2>
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
            {isSearching
              ? filteredResults.map((drama) => (
                  <div
                    key={drama.id}
                    className={styles.dramaCard}
                    onClick={() => handleDramaClick(drama)}
                  >
                    <img src={drama.poster} alt={drama.title} className={styles.dramaImage} />
                  </div>
                ))
              : // Jika input sudah dilakukan dan Enter ditekan
                defaultTropeFilter.map((drama) => (
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

        <section className={styles.otherTropes}>
          <h3 className={styles.tropeTitle}>Other Popular Tropes</h3>
          <div className={styles.tropeButtons}>
            {[
              "Friends to Lovers",
              "Fake Marriage",
              "Enemies to Lovers",
              "Love Triangle",
              "Secret Identity",
              "Time Travel",
            ].map((trope) => (
              <button
                key={trope}
                onClick={() => handleButtonSearch(trope)}
                className={styles.tropeButton}
              >
                {trope}
              </button>
            ))}
          </div>
        </section>

        {selectedDrama && (
          <div className={styles.popupOverlay} onClick={closePopup}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedDrama.title}</h2>
              <div className={styles.year}>Year: {selectedDrama.year}</div>
              <div className={styles.genre}>Genre: {selectedDrama.genre}</div>
              <div className={styles.platform}>Platform: {selectedDrama.platform}</div>
              <div className={styles.status}>Status: {selectedDrama.status}</div>
              <div className={styles.trope}>Trope: {selectedDrama.trope}</div>
              <p className={styles.description}>Episodes: {selectedDrama.episode}</p>
              <div className={styles.closeButtonWrapper}>
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
