import { Fragment } from "react";
import { motion } from "framer-motion";

import styles from "./testimonials-columns-1.module.css";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}

export function TestimonialsColumn({ testimonials, className, duration = 10 }: TestimonialsColumnProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{ y: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className={styles.column}
      >
        {[0, 1].map((loop) => (
          <Fragment key={loop}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <article className={styles.card} key={`${loop}-${i}`}>
                <p className={styles.text}>{text}</p>
                <div className={styles.author}>
                  <img
                    src={image}
                    alt={name}
                    width={44}
                    height={44}
                    loading="lazy"
                    className={styles.avatar}
                  />
                  <div className={styles.meta}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.role}>{role}</div>
                  </div>
                </div>
              </article>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default TestimonialsColumn;
