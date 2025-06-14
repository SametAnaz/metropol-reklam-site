import styles from '../../styles/GlowBackground.module.css';

const ParticleBackground = () => {
  return (
    <div className={styles['glow-container']}>
      <div className={styles.ball}></div>
      <div 
        className={styles.ball} 
        style={{'--delay': '-12s', '--size': '0.35', '--speed': '25s'}}
      ></div>
      <div 
        className={styles.ball} 
        style={{'--delay': '-10s', '--size': '0.3', '--speed': '15s'}}
      ></div>
    </div>
  );
};

export default ParticleBackground;
