import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loanee",
  description: "Your personal finance assistant",
};

const demoImagesRotation = [
	'iphoneSecond.png',
	'demoIphoneTwelvth.png',
	'demoIphoneThirteenth.png',
	'demoIphoneFirst.png',
	'demoIphoneSecond.png',
	'demoIphoneThird.png',
	'demoIphoneFourth.png',
	'demoIphoneFifth.png',
	'demoIphoneSixth.png',
	'demoIphoneSeventh.png',
	'demoIphoneEighth.png',
	'demoIphoneNinth.png',
	'demoIphoneTenth.png',
	'demoIphoneEleventh.png',
]

const FeatureImages = [
    'iphoneHero.png',
    'iphoneFirst.png',
    'iphoneSecond.png',
    'iphoneThird.png',
    'iphoneFourth.png',
    'iphoneFifth.png',
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {demoImagesRotation.map((image) => (
          <link key={image} rel="preload" href={`/images/${image}`} as="image" />
        ))}
        {FeatureImages.map((image) => (
          <link key={image} rel="preload" href={`/images/${image}`} as="image" />
        ))}
      </Head>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
