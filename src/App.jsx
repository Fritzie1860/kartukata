import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORDS } from "./data/words";

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

  function prevCard() {
    if (currentIndex > 0) {
      setDirection(-1);
      setFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  }
  const card = cards[currentIndex];

  return (
    <div
      style={{
        minHeight: "100vh",        
        display: "flex",           
        justifyContent: "center",  
        alignItems: "center",     
        fontFamily: "Inter, system-ui, Arial",
        background: "#f9fafb",     
      }}
    >
      {/* Bungkus semua konten dalam card-container */}
      <div style={{ textAlign: "center", padding: 20 }}>
        {/* Input jumlah kartu */}
        <div 
          style={{ 
            marginBottom: 12
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "2px",
              textAlign: "center",
              marginBottom: 20,
              color: "#1E7082", 
              textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            SINONIM
          </h1>
          <label style={{ marginTop: 16}}>Jumlah kartu: </label>
          <input
            type="number"
            value={limit}
            min={1}
            max={WORDS.length}
            onChange={(e) => setLimit(Number(e.target.value || 1))}
            style={{ width: 60, marginLeft: 6, borderRadius: 5 }}
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
              key={currentIndex}
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
              <div class="shadow-lg"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backfaceVisibility: "hidden",
                  borderRadius: 16,
                  background: "#bae6fd",
                  color: "#1E7082",
                  fontSize: 24,
                  fontWeight: 700,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
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
                  color: "#7A3481",
                  fontSize: 22,
                  fontWeight: 700,
                  transform: "rotateY(180deg)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                }}
              >
                {card.synonym}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter */}
        <p style={{ marginTop: 16, fontSize: 14 }}>
          <span style={{fontWeight: "bold", color:"#10b981"}}>{currentIndex + 1}</span> dari <span style={{fontWeight: "bold", color:"#10b981"}}>{cards.length}</span> kartu
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
          <button
            onClick={prevCard}
            disabled={currentIndex <= 0}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: currentIndex <= 0 ? "#9ca3af" : "#10b981",
              color: "white",
              border: "none",
              cursor: currentIndex <= 0 ? "not-allowed" : "pointer",
              boxShadow: currentIndex <= 0 ? "none" : "0 4px 6px rgba(0,0,0,0.2)",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseDown={(e) => {
              if (currentIndex > 0) e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ◀
          </button>
          <button
            onClick={nextCard}
            disabled={currentIndex >= cards.length - 1}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: currentIndex >= cards.length - 1 ? "#9ca3af" : "#10b981",
              color: "white",
              border: "none",
              cursor: currentIndex >= cards.length - 1 ? "not-allowed" : "pointer",
              boxShadow: currentIndex >= cards.length - 1 ? "none" : "0 4px 6px rgba(0,0,0,0.2)",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseDown={(e) => {
              if (currentIndex < cards.length - 1) e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ▶
          </button>
          <button
            onClick={handleShuffle}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "#C6EBD9",
              color: "#23955E",
              border: "none",
              cursor: currentIndex >= cards.length - 1 ? "not-allowed" : "pointer",
              boxShadow: currentIndex >= cards.length - 1 ? "none" : "0 4px 6px rgba(0,0,0,0.2)",
              transition: "all 0.15s ease-in-out"
            }}
              onMouseDown={(e) => {
              if (currentIndex < cards.length - 1) e.currentTarget.style.transform = "scale(0.95)";
            }}
              onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            acak ulang
          </button>
        </div>
      </div>
    </div>
  );
}


