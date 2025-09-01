import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANTONIM } from "../data/words-antonim";               
import styles from "./Antonim.module.css";           
import { useNavigate } from "react-router-dom"; 
import { ArrowLeft } from "lucide-react";     
import Footer from "./Footer.jsx";  

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Sinonim() {
  const [limit, setLimit] = useState(10);
  const [cards, setCards] = useState(() => shuffleArray(ANTONIM).slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const n = Math.max(1, Math.min(limit || 1, ANTONIM.length));
    setCards(shuffleArray(ANTONIM).slice(0, n));
    setCurrentIndex(0);
    setFlipped(false);
  }, [limit]);

  function handleShuffle() {
    const n = Math.max(1, Math.min(limit || 1, ANTONIM.length));
    setCards(shuffleArray(ANTONIM).slice(0, n));
    setCurrentIndex(0);
    setFlipped(false);
  }

  function nextCard() {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevCard() {
    if (currentIndex > 0) {
      setDirection(-1);
      setFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  }

  const card = cards[currentIndex] || { word: "-", antonym: "-" };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button 
          onClick={() => navigate("/menu")} 
          className={styles.backButton}
        ><ArrowLeft size={18}/> 
        </button>
        <div className={styles.inputWrapper}>
          <h1 className={styles.title}>ANTONIM</h1>
          <label>Jumlah kartu: </label>
          <input
            type="number"
            value={limit}
            min={1}
            max={ANTONIM.length}
            onChange={(e) => setLimit(Number(e.target.value || 1))}
            className={styles.input}
          />
        </div>

        <div className={styles.cardContainer}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              onClick={() => setFlipped((f) => !f)}
              initial={{ opacity: 0, x: 100 * direction, rotate: 15 * direction }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                rotateY: flipped ? 180 : 0,
                transition: { duration: 0.6 },
              }}
              exit={{
                opacity: 0,
                x: -100 * direction,
                rotate: -15 * direction,
                transition: { duration: 0.4 },
              }}
              className={styles.card}
            >
              <div className={styles.front}>{card.word}</div>
              <div className={styles.back}>{card.antonym}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className={styles.counter}>
          <span>{currentIndex + 1}</span> dari <span>{cards.length}</span> kartu
        </p>

        <div className={styles.buttons}>
          <button
            onClick={prevCard}
            disabled={currentIndex <= 0}
            className={`${styles.button} ${styles.prev}`}
          >
            ◀
          </button>
          <button
            onClick={nextCard}
            disabled={currentIndex >= cards.length - 1}
            className={`${styles.button} ${styles.next}`}
          >
            ▶
          </button>
          <button
            onClick={handleShuffle}
            className={`${styles.button} ${styles.shuffle}`}
          >
            acak ulang
          </button>
        </div>
        <Footer/>
      </div>
    </div>
  );
}
