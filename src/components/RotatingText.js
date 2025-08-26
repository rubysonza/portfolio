import styles from './RotatingText.module.css';

export default function RotatingText() {
  return (
    <div className={styles.rotatingTextContainer}>
      <svg
        className={styles.rotatingTextSvg}
        viewBox="0 0 200 200"
        width="250"
        height="250"
      >
        <path
          id="circlePath"
          fill="none"
          stroke="none"
          d="
            M 100, 100
            m -75, 0
            a 75,75 0 1,1 150,0
            a 75,75 0 1,1 -150,0
          "
        />

        <text className={styles.svgText}>
          <textPath href="#circlePath" startOffset="8%">
            web designer and developer
          </textPath>
        </text>
      </svg>
    </div>
  );
}