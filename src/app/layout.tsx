// src/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'Pick Our Picks',
  description: 'Rekomendasi drama Korea berdasarkan trope',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
