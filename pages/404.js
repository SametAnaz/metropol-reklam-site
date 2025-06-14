import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Error404.module.css';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Parallax efektini başlat
    if (typeof window !== 'undefined' && window.Parallax) {
      var scene = document.getElementById('scene');
      var parallax = new Parallax(scene);
    }
  }, []);

  return (
    <>
      <Head>
        <title>404 - Sayfa Bulunamadı | Metropol Reklam</title>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js" />
      </Head>

      <div className={`${styles.root} ${styles['error-page']}`}>
        <nav>
          <div className={styles.menu}>
            <p className={styles.website_name}>METROPOL REKLAM</p>
            <div className={styles.menu_links}>
              <a href="/" className={styles.link}>Anasayfa</a>
              <a href="/about" className={styles.link}>Hakkımızda</a>
              <a href="/contact" className={styles.link}>İletişim</a>
            </div>
            <div className={styles.menu_icon}>
              <span className={styles.icon}></span>
            </div>
          </div>
        </nav>

        <section className={styles.wrapper}>
          <div className={styles.container}>
            <div id="scene" className={styles.scene} data-hover-only="false">
              <div className={styles.circle} data-depth="1.2"></div>

              <div className={styles.one} data-depth="0.9">
                <div className={styles.content}>
                  <span className={styles.piece}></span>
                  <span className={styles.piece}></span>
                  <span className={styles.piece}></span>
                </div>
              </div>

              <div className={styles.two} data-depth="0.60">
                <div className={styles.content}>
                  <span className={styles.piece}></span>
                  <span className={styles.piece}></span>
                  <span className={styles.piece}></span>
                </div>
              </div>

              <div className={styles.three} data-depth="0.40">
                <div className={styles.content}>
                  <span className={styles.piece}></span>
                  <span className={styles.piece}></span>
                  <span className={styles.piece}></span>
                </div>
              </div>

              <p className={styles.p404} data-depth="0.50">404</p>
              <p className={styles.p404} data-depth="0.10">404</p>
            </div>

            <div className={styles.text}>
              <article>
                <p>Aradığınız sayfa bulunamadı! <br/>Anasayfaya dönmek ister misiniz?</p>
                <button onClick={() => router.push('/')}>Anasayfaya Dön</button>
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Custom404;
