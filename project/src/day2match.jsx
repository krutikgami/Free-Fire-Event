import { motion } from "framer-motion";

const Day2Scores = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold"
      >
        🚀 Coming Soon 🚀
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg font-bold"
      >
        Stay tuned for Day 2 Live Matches Scores! 🔥
      </motion.p>
    </div>
  );
};

export default Day2Scores;
