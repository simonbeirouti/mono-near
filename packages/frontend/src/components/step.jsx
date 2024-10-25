'use client';

import React, { useState, useEffect } from 'react';
import { Coins, Image, Key, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [
  { Icon: Coins, text: "Buyin", color: "text-yellow-500" },
  { Icon: Image, text: "Badge", color: "text-blue-500" },
  { Icon: Key, text: "Access", color: "text-purple-500" },
  { Icon: Bot, text: "Mascot", color: "text-green-500" }
];

const IconComponent = ({ Icon, text, color, isActive }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-around mx-24"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className={`p-6 bg-white rounded-full shadow-lg ${isActive ? color : 'text-gray-400'}`}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Icon size={48} />
      </motion.div>
      <p className="mt-2 text-center text-sm font-medium">{text}</p>
    </motion.div>
  );
};

const StepIcons = () => {
  const [activeSteps, setActiveSteps] = useState([true, false, false, false]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSteps(prev => {
        const nextIndex = prev.indexOf(false);
        if (nextIndex === -1) return prev;
        const newState = [...prev];
        newState[nextIndex] = true;
        return newState;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center w-2/3">
      {icons.map((icon, index) => (
        <IconComponent key={icon.text} {...icon} isActive={activeSteps[index]} />
      ))}
    </div>
  );
};

export default StepIcons;
