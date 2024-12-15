// src/app/homepage/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./homepage.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Define a type for Drama
type Drama = {
  id: number;
  title: string;
  image: string;
  description: string;
};

// Use Drama[] for dramaData
const dramaData: Drama[] = [
  { id: 1, title: "Drama 1", image: "/crashlanding.jpg", description: "Description 1" },
  { id: 2, title: "Drama 2", image: "/mlfts.jpg", description: "Description 2" },
  { id: 3, title: "Drama 3", image: "/hometowncha.jpg", description: "Description 3" },
  { id: 4, title: "Drama 4", image: "/callitlove.jpg", description: "Description 4" },
  { id: 5, title: "Drama 5", image: "/moonlovers.jpg", description: "Description 5" },
  { id: 6, title: "Drama 6", image: "/loveyourenemy.jpg", description: "Description 6" },
  { id: 7, title: "Drama 7", image: "/doomat.jpg", description: "Description 5" },
  { id: 8, title: "Drama 7", image: "/myname.jpg", description: "Description 5" },
  { id: 9, title: "Drama 7", image: "/dalicocky.jpg", description: "Description 5" },
  { id: 10, title: "Drama 7", image: "/moonintheday.jpg", description: "Description 5" },
];

const Homepage = () => {
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
          <p className={styles.description}> You can find different genres with the same trope</p>
          <input type="text" placeholder="Search your favorite trope..." className={styles.searchBar} />
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

        <section className={styles.otherTropes}>
          <h3 className={styles.tropeTitle}>Other Popular Tropes</h3>
          <div className={styles.tropeButtons}>
            <button>Friends to Lovers</button>
            <button>Fake Marriage</button>
            <button>Enemies to Lovers</button>
            <button>Love Triangle</button>
            <button>Secret Identity</button>
            <button>Time Travel</button>
          </div>
        </section>

        {selectedDrama && (
          <div className={styles.popupOverlay} onClick={closePopup}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedDrama.title}</h2>
              <img src={selectedDrama.image} alt={selectedDrama.title} />
              <p>{selectedDrama.description}</p>
              <button className={styles.closeButton} onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;