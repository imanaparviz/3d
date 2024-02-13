"use client"
import Image from 'next/image';
import { useState } from 'react';
import styles from './baner.module.css';

interface BannerProps {
  title: string;
  description: string;
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.banner} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageContainer}>
        {/* Ändern Sie die Breite und Höhe des Bildcontainers nach Bedarf */}
        <div style={{ width: '400px', height: '400px' }}>
          <Image src="/cartoon.png" alt="cartoon" layout="fill" objectFit="cover" />
        </div>
      </div>

      <div className={styles.bannerText}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Banner;
