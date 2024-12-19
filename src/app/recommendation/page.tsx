"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./recommendation.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Drama = {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string;
  trope: string;
};

const Recommendation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trope = searchParams.get("trope") || "";
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await fetch(`/api/dramas?trope=${encodeURIComponent(trope)}`);
        const data = await response.json();
        setDramas(data);
      } catch (error) {
        console.error("Failed to fetch dramas:", error);
      }
    };

    if (trope) fetchDramas();
  }, [trope]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/recommendation?trope=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/headerimg.png" alt="Pick Our Picks" width={65} height={20} priority />
      </header>

      <main className="px-8 py-12">
        <div className={styles["main-sec"]}>
          <h1 className={styles.title}>
            Results for trope: <span className={styles.tropeHighlight}>{trope || "All Tropes"}</span>
          </h1>
          <input
            type="text"
            placeholder="Search your favorite trope..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <section>
          {dramas.length > 0 ? (
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
              {dramas.map((drama) => (
                <div key={drama.id} className={styles.dramaCard}>
                  <img src={drama.poster} alt={drama.title} className={styles.dramaImage} />
                  <h2 className={styles.dramaTitle}>{drama.title}</h2>
                </div>
              ))}
            </Carousel>
          ) : (
            <p className={styles.noResults}>No dramas found for this trope.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Recommendation;
