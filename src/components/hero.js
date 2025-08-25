import Image from "next/image";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.imageContainer}>
        <Image src="/profile.webp" alt="Photo of Ruby Sonza" width={200} height={200} className={styles.profileImage} />
        {/* Add rotating text here */}
      </div>

      <h1 className={styles.greeting}>
        Hey, I&apos;m <span className={styles.name}>Ruby</span>
      </h1>

      {/* Add social icons here */}
    </section>
  );
}