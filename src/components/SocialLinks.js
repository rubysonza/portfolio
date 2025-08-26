import styles from './SocialLinks.module.css';
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithub } from "react-icons/tb";
import { SiGmail } from "react-icons/si";

export default function SocialLinks() {
  return (
    <div className={styles.socialContainer}>
      <a
        href="https://www.linkedin.com/in/ruby-sonza"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Link to LinkedIn profile"
        className={`${styles.socialLink} ${styles.linkedinLink}`}
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://github.com/rubysonza"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Link to GitHub profile"
        className={`${styles.socialLink} ${styles.githubLink}`}
      >
        <TbBrandGithub />
      </a>
      <a
        href="mailto:rubyabayasonza@gmail.com"
        aria-label="Send an email"
        className={`${styles.socialLink} ${styles.emailLink}`}
      >
        <SiGmail />
      </a>
    </div>
  );
}