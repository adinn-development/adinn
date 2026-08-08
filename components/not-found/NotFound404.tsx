// components/not-found/NotFound404.tsx

import Image from "next/image";
import Link from "next/link";
import artwork404 from "@/assets/images/404_notfounderror.png";
import background404 from "@/assets/images/404-background-image.png";
import styles from "./NotFound404.module.css";

export default function NotFound404() {
  return (
    <main className={styles.notFound}>
      <Image
        src={background404}
        alt=""
        fill
        priority
        className={styles.background}
      />

      <section className={styles.content}>
        <Image
          src={artwork404}
          alt="404 Page Not Found"
          priority
          className={styles.art}
        />

        <h1 className={styles.title}>Page Not Found</h1>

        <p className={styles.message}>
          The page you are looking for might have been removed,
          <br />
          had its name changed, or is temporarily unavailable.
        </p>

        <p className={styles.back}>
          LET&apos;S GET YOU <span>BACK</span>
        </p>

        <Link href="/" className={styles.button}>
          Go to Home
        </Link>
      </section>
    </main>
  );
}