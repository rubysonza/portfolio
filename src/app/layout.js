import { Josefin_Sans, Reddit_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const josefin_sans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify the weights you'll use
  variable: '--font-josefin', // This creates a CSS variable
});

const reddit_mono = Reddit_Mono({
  subsets: ['latin'],
  weight: ['400'], // Reddit Mono is often used at a single weight
  variable: '--font-reddit-mono', // This creates another CSS variable
});

export const metadata = {
  title: 'Ruby Sonza | Portfolio',
  description: 'The portfolio of web designer and developer Ruby Sonza.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefin_sans.variable} ${reddit_mono.variable}`}>
      <body>
        <Header /> {/* 2. Add the Header component here */}
        {children}
      </body>
    </html>
  );
}