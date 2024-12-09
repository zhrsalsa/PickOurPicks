import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pick Our Picks</title>
        <meta name="description" content="Rekomendasi film berdasarkan trope yang kamu suka!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Pick Our Picks</h1>
        <p>Temukan film yang sesuai dengan trope favoritmu!</p>
      </header>

      <main className={styles.main}>
        <section className={styles.formSection}>
          <h2>Masukkan Trope yang Kamu Suka</h2>
          <form>
            <label htmlFor="trope">Pilih Trope:</label>
            <select id="trope" name="trope">
              <option value="romantic">Romantic</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="thriller">Thriller</option>
              {/* Add more tropes as needed */}
            </select>

            <button type="submit">Dapatkan Rekomendasi</button>
          </form>
        </section>

        <section className={styles.recommendations}>
          <h2>Rekomendasi Film</h2>
          <div className={styles.movieList}>
            {/* This can be dynamically populated based on the selected trope */}
            <div className={styles.movieCard}>
              <img src="/movie-placeholder.jpg" alt="Movie Poster" />
              <p>Movie Title</p>
            </div>
            <div className={styles.movieCard}>
              <img src="/movie-placeholder.jpg" alt="Movie Poster" />
              <p>Movie Title</p>
            </div>
            {/* More movie cards */}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Pick Our Picks</p>
      </footer>
    </div>
  );
}
