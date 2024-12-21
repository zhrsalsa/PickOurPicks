"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./recommendation.module.css";
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

const Recommendation = () => {
  const router = useRouter();
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Drama[]>([]);
  const [matchedTropes, setMatchedTropes] = useState<string[]>([]); // State for matched tropes
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);

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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const results = dramas.filter((drama) =>
        drama.trope?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);

      const matched = [
        ...new Set(
          results
            .flatMap((drama) => drama.trope.split(","))
            .filter((trope) => trope.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
      ];
      setMatchedTropes(matched); // Update matched tropes state
    }
  };

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

  const handleButtonSearch = (trope: string) => {
    setSearchTerm(trope);
    const results = dramas.filter((drama) =>
      drama.trope && drama.trope.toLowerCase().includes(trope.toLowerCase()) // Check if trope exists before calling toLowerCase
    );
    setFilteredResults(results);
  
    const matched = [
      ...new Set(
        results
          .flatMap((drama) => drama.trope.split(","))
          .filter((t) => t.toLowerCase().includes(trope.toLowerCase()))
      ),
    ];
    setMatchedTropes(matched);
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
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="px-8 py-12">
        <div className={styles["main-sec"]}>
          <h1 className={styles.title}>Let us know what's your favorite trope</h1>
          <input
            type="text"
            placeholder="Search your favorite trope..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <section className={styles.otherTropes}>
          <h3 className={styles.tropeTitle}>Popular Tropes</h3>
          <div className={styles.tropeButtons}>
            {[
              "Friends to Lovers",
              "Forced Proximity",
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

        <section>
          {searchTerm.trim() !== "" && matchedTropes.length > 0 && (
            <div className={styles.matchedTropes}>
              <h3 className={styles.tropeTitle}>Matched Tropes:</h3>
              <ul>
                {matchedTropes.map((trope, index) => (
                  <li key={index}>{trope}</li>
                ))}
              </ul>
            </div>
          )}
          <h3 className={styles.tropeTitle}>
            {searchTerm.trim() === "" ? "Dramas" : `Results for "${searchTerm}"`}
          </h3>
          <Carousel
            responsive={{
              superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            }}
            className={styles.carousel}
            swipeable
            draggable
            ssr
            keyBoardControl
            partialVisbile
          >
            {searchTerm.trim() === ""
              ? dramas.map((drama) => (
                  <div
                    key={drama.id}
                    className={styles.dramaCard}
                    onClick={() => handleDramaClick(drama)}
                  >
                    <img src={drama.poster} alt={drama.title} className={styles.dramaImage} />
                  </div>
                ))
              : filteredResults.length > 0
              ? filteredResults.map((drama) => (
                  <div
                    key={drama.id}
                    className={styles.dramaCard}
                    onClick={() => handleDramaClick(drama)}
                  >
                    <img src={drama.poster} alt={drama.title} className={styles.dramaImage} />
                  </div>
                ))
              : <p className={styles.noResults}>No dramas found for this trope.</p>}
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
              <p className={styles.description}>{selectedDrama.episode}</p>
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

export default Recommendation;
