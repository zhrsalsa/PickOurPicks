// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Pick Our Picks',
  description: 'Website rekomendasi drama Korea berdasarkan trope',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
