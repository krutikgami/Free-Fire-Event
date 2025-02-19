import { motion } from 'framer-motion';
import { FaGamepad, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-cover bg-center h-screen flex flex-col items-center justify-center text-center shadow-lg">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">🔥 Free Fire Championship 2025 🔥</h1>
        <p className="text-lg mt-3">The ultimate battleground for warriors! Witness the action live.</p>
        <div className="mt-5 p-4 bg-yellow-500 text-black font-bold rounded-lg text-lg">
          🌟 Unleash the Fire, Claim the Glory! 🌟
        </div>
        <p className="text-md mt-2">🗓️ Date: 20, 21 Feb 2025 | 📍 Location: Rooms 307, 308, 309</p>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
          <h3 className="text-3xl font-bold flex items-center gap-2 text-yellow-400"><FaFire /> Day 1 Matches - Scores</h3>
          <p className="mt-4">🔥 Intense battles, top teams fighting for the grand prize. Stay tuned!</p>
          <div className="mt-6">
            <Link to="/day1-scores" className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold text-lg hover:bg-yellow-600">View Scores</Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
          <h3 className="text-3xl font-bold flex items-center gap-2 text-blue-400"><FaGamepad /> Day 2 Matches - Scores</h3>
          <p className="mt-4">🔥 The best of the best face off to claim victory. Who will be the champion?</p>
          <div className="mt-6">
            <Link to="/day2-scores" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold text-lg hover:bg-blue-600">View Scores</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;