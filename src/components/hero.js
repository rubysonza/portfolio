import Image from "next/image";
import styles from "./Hero.module.css";
import RotatingText from "./RotatingText";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  return (
    <section className={styles.heroContainer}>

      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src="/profile.webp"
            alt="Photo of Ruby Sonza"
            width={200}
            height={200}
            className={styles.profileImage}
          />
          <RotatingText />
        </div>

        <h1 className={styles.greeting}>
          <div className={styles.greetingLine}>
            <span>Hey,</span>
          </div>
          <div className={styles.greetingLine}>
            <span>I&apos;m </span>
            <span className={styles.highlight}>Ruby</span>
          </div>
        </h1>
      </div>
      
    </section>
  );
}