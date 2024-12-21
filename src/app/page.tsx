import Link from 'next/link';
import styles from './styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <Image
          src="/headerimg.png"
          alt="Pick Our Picks"
          width={65}
          height={20}
          priority
        />
        <nav className={styles.nav}>
          <a href="/login">Login</a>
          <a href="/signup" style={{ fontWeight: 'bold' }}>Sign Up</a>
        </nav>
      </header>

      <section
        className={styles.hero}
        style={{ backgroundImage: `url('/samdalri.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className={styles.heroOverlay}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>What kind of trope are you looking for?</h2>
          <h2 style={{ fontFamily: 'Noto Serif KR, sans-serif' }}>추천 상품 선택</h2>
          <Link href="/signup">
            <button className={styles.heroButton}>Get Started</button>
          </Link>
        </div>
      </section>

      <main className="px-8 py-12">
        <section id="found-family" className={`${styles.section} ${styles['section-right']}`}>
          <div className={styles['section-desc']}>
            <h3>Found Family</h3>
            <p>A family through bonds, not blood.</p>
          </div>
          <div className={styles['feature-container']}>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/fbc.jpg')" }}>
              <h4>Family by Choice</h4>
              <p>Romance</p>
            </div>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/uncanny.jpg')" }}>
              <h4>The Uncanny Counter</h4>
              <p>Thriller</p>
            </div>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/sweethome.jpg')" }}>
              <h4>Sweet Home</h4>
              <p>Thriller</p>
            </div>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/waikiki.jpg')" }}>
              <h4>Welcome to Waikiki</h4>
              <p>Comedy</p>
            </div>
          </div>
        </section>

        <section id="romance" className={`${styles.section} ${styles['section-left']}`}>
          <div className={styles['feature-container']}>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/crashlanding.jpg')" }}>
              <h4>Crash Landing on You</h4>
              <p>Enemies to Lovers</p>
            </div>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/firstlife.jpg')" }}>
              <h4>Because This Is My First Life</h4>
              <p>Strangers to Lovers</p>
            </div>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/perfstranger.jpg')" }}>
              <h4>My Perfect Stranger</h4>
              <p>Back to The Past</p>
            </div>
            <div className={styles['feature-card']} style={{ backgroundImage: "url('/lovenextdoor.jpg')" }}>
              <h4>Love Next Door</h4>
              <p>Friends to Lovers</p>
            </div>
          </div>
          <div className={styles['section2-desc']}>
            <h3>Romance</h3>
            <p>Something is in the air.</p>
          </div>
        </section>

        <section id="fitur" className={styles["fitur-section"]}>
          <h2 className={styles["fitur-title"]}>Discover your favorite!</h2>
          <p className={styles["fitur-title-desc"]}>Let us know what's your favorite trope and we'll find kdrama that suits your taste the best.</p>
          <div className={styles["fitur-container"]}>
            <div className={styles["fitur-card"]}>
              <h4>Watchlist</h4>
              <p>
              Add your favorite Korean dramas to your watchlist so you will not forget to watch them.
              </p>
            </div>
            <div className={styles["fitur-card"]}>
              <h4>Genre</h4>
              <p>
              Explore Korean dramas based on your favorite genres such as romance, action, or mystery.
              </p>
            </div>
            <div className={styles["fitur-card"]}>
              <h4>Trope</h4>
              <p>
              Discover dramas based on exciting tropes like Enemies to Lovers or Found Family.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Pick Our Picks. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
