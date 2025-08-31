import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const questions = [
  { front: "Ibukota Indonesia?", back: "Jakarta" },
  { front: "2 + 2?", back: "4" },
  { front: "Warna langit siang?", back: "Biru" },
  { front: "Huruf ke-3 alfabet?", back: "C" },
  { front: "Planet terdekat dari matahari?", back: "Merkurius" },
  { front: "Bendera Jepang berwarna?", back: "Putih & Merah bulat" },
  { front: "Hewan darat tercepat?", back: "Cheetah" },
];

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [duration, setDuration] = useState(10);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [flipped, setFlipped] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isStarted || isFinished) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isStarted, isFinished]);

  const handleStart = () => {
    setIsStarted(true);
    setIsFinished(false);
    setCurrentQuestion(0);
    setTimeLeft(duration);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      setIsFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(duration);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(duration);
      setFlipped(false);
    }
  };

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      {!isStarted ? (
        // First page (setup)
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center space-y-4 w-80">
          <h1 className="text-xl font-bold">Setup Quiz</h1>

          <div>
            <label className="block mb-1">Durasi per soal (detik):</label>
            <select
              className="border rounded p-2 w-full"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Total soal:</label>
            <select
              className="border rounded p-2 w-full"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(Number(e.target.value))}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={7}>7</option>
            </select>
          </div>

          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
          >
            Start
          </button>
        </div>
      ) : isFinished ? (
        // Ending page
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80">
          <h1 className="text-2xl font-bold mb-2">🎉 Selamat!</h1>
          <p>Kamu sudah menyelesaikan semua soal!</p>
          <button
            onClick={() => setIsStarted(false)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Main lagi
          </button>
        </div>
      ) : (
        // Quiz page
        <div className="text-center space-y-6">
          <div className="text-lg font-bold">
            Soal {currentQuestion + 1} / {totalQuestions}
          </div>
          <div className="text-red-500 font-bold">⏳ {timeLeft}s</div>

          {/* Card */}
          <div
            className="w-64 h-40 mx-auto cursor-pointer perspective"
            onClick={handleFlip}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center backface-hidden">
                {questions[currentQuestion % questions.length].front}
              </div>
              <div className="absolute w-full h-full bg-yellow-200 rounded-xl shadow-lg flex items-center justify-center backface-hidden"
                style={{ transform: "rotateY(180deg)" }}>
                {questions[currentQuestion % questions.length].back}
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="bg-gray-400 text-white px-3 py-1 rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
