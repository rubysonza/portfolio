import styles from './Footer.module.css';
import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <h2 className={styles.title}>Let's get connected!</h2>
                <SocialLinks />
            </div>

            <p className={styles.copyright}>&copy; 2025 Ruby Sonza</p>
        </footer>
    );
}