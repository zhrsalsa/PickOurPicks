import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>Pick Our Picks</h1>
      <nav className={styles.nav}>
        <Link href="/login">Login</Link>
        <Link href="/signup" style={{ fontWeight: 'bold' }}>Sign Up</Link>
      </nav>
    </header>
  );
}
