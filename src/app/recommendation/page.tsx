// src/app/homepage/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./recommendation.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaHeart, FaRing, FaUserSecret, FaClock, FaUsers, FaHistory } from "react-icons/fa";

// Define a type for Drama
type Drama = {
  id: number;
  title: string;
  image: string;
  description: string;
  year: number;
  genre: string;
};

// Use Drama[] for dramaData
const dramaData: Drama[] = [
  { id: 1, title: "Drama 1", image: "/crashlanding.jpg", description: "Description 1", year: 2024, genre: "Romance"},
  { id: 2, title: "Drama 2", image: "/mlfts.jpg", description: "Description 2", year: 2024, genre: "Romance" },
  { id: 3, title: "Drama 3", image: "/hometowncha.jpg", description: "Description 3", year: 2024, genre: "Romance" },
  { id: 4, title: "Drama 4", image: "/callitlove.jpg", description: "Description 4", year: 2024, genre: "Romance"},
  { id: 5, title: "Drama 5", image: "/moonlovers.jpg", description: "Description 5", year: 2024, genre: "Romance" },
  { id: 6, title: "Drama 6", image: "/loveyourenemy.jpg", description: "Description 6", year: 2024, genre: "Romance" },
  { id: 7, title: "Drama 7", image: "/doomat.jpg", description: "Description 5", year: 2024, genre: "Romance" },
  { id: 8, title: "Drama 8", image: "/myname.jpg", description: "Description 5", year: 2024, genre: "Romance" },
  { id: 9, title: "Drama 9", image: "/dalicocky.jpg", description: "Description 5", year: 2024, genre: "Romance"},
  { id: 10, title: "Drama 10", image: "/moonintheday.jpg", description: "Description 5", year: 2024, genre: "Romance"},
];

const tropes = [
  { name: "Friends to Lovers", icon: <FaHeart /> },
  { name: "Fake Marriage", icon: <FaRing /> },
  { name: "Secret Identity", icon: <FaUserSecret /> },
  { name: "Enemies to Lovers", icon: <FaUsers /> },
  { name: "Time Travel", icon: <FaHistory /> },
  { name: "Love Triangle", icon: <FaClock /> },
];

const Recommendation = () => {
  const router = useRouter();
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);

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
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/headerimg.png" alt="Pick Our Picks" width={65} height={20} priority />
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </header>

      <main className="px-8 py-12">
        <div className={styles['main-sec']}>
          <h1 className={styles.title}>Explore dramas to watch based on trope in the story!</h1>
          <input type="text" placeholder="Search your favorite trope..." className={styles.searchBar} />
        </div>

        <section>
          <h3 className={styles.tropeTitle}>Results</h3>
          <Carousel 
            responsive={responsive}
            className={styles.carousel}
            swipeable
            draggable
            ssr
            keyBoardControl
            partialVisbile
          >
            {dramaData.map((drama) => (
              <div
                key={drama.id}
                className={styles.dramaCard}
                onClick={() => handleDramaClick(drama)} 
              >
                <img src={drama.image} alt={drama.title} className={styles.dramaImage} />
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
              <p className={styles.description}>{selectedDrama.description}</p>
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