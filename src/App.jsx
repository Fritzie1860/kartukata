import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  { word: "efusi", synonym: "pencurahan" },
  { word: "abstrak", synonym: "tidak nyata" },
  { word: "kompeten", synonym: "mampu" },
  { word: "produktif", synonym: "berdaya guna" },
  { word: "ramah", synonym: "sopan" },
  { word: "valid", synonym: "sah" },
  { word: "tegas", synonym: "keras" },
  { word: "cepat", synonym: "kilat" },
  { word: "fleksibel", synonym: "lentur" },
  { word: "efisien", synonym: "hemat" },
];

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FlashcardSingle() {
  const [limit, setLimit] = useState(10);
  const [cards, setCards] = useState(() => shuffleArray(WORDS).slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const n = Math.max(1, Math.min(limit || 1, WORDS.length));
    setCards(shuffleArray(WORDS).slice(0, n));
    setCurrentIndex(0);
    setFlipped(false);
  }, [limit]);

  function handleShuffle() {
    const n = Math.max(1, Math.min(limit || 1, WORDS.length));
    setCards(shuffleArray(WORDS).slice(0, n));
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

  const card = cards[currentIndex];

  return (
    <div style={{ padding: 20, fontFamily: "Inter, system-ui, Arial", textAlign: "center" }}>
      <div style={{ marginBottom: 12 }}>
        <label>Jumlah kartu: </label>
        <input
          type="number"
          value={limit}
          min={1}
          max={WORDS.length}
          onChange={(e) => setLimit(Number(e.target.value || 1))}
          style={{ width: 60, marginLeft: 6 }}
        />
      </div>

      {/* Flashcard */}
      <div
        style={{
          perspective: 1000,
          width: 250,
          height: 350,
          margin: "0 auto",
          cursor: "pointer",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex} // penting biar AnimatePresence detect perubahan
            onClick={() => setFlipped(!flipped)}
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
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
                borderRadius: 16,
                background: "#bae6fd",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {card.word}
            </div>

            {/* Back */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
                borderRadius: 16,
                background: "#e9d5ff",
                fontSize: 22,
                fontWeight: 700,
                transform: "rotateY(180deg)",
              }}
            >
              {card.synonym}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <p style={{ marginTop: 16 }}>
        {currentIndex + 1} dari {cards.length} kartu
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        <button
          onClick={nextCard}
          disabled={currentIndex >= cards.length - 1}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "#10b981",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next
        </button>
        <button
          onClick={handleShuffle}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "#f59e0b",
            color: "#111",
            border: "none",
            cursor: "pointer",
          }}
        >
          Acak ulang
        </button>
      </div>
    </div>
  );
}
