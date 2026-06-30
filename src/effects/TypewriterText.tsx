'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterTextProps {
  text?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text = "Building the future, one line at a time...",
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  className = "",
  showCursor = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isFinished = !loop && displayText.length === text.length;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isFinished) {
      return;
    }

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        if (loop) {
          setIsDeleting(true);
        }
      }, pauseDuration);
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
      }
    } else {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, speed);
      } else if (loop) {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, text, speed, deleteSpeed, pauseDuration, loop, isFinished]);

  return (
    <div className={`${className}`}>
      <span className="">
        {displayText}
        {showCursor && !isPaused && !isFinished && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="text-blue-500 ml-1"
          >
            |
          </motion.span>
        )}
      </span>
    </div>
  );
};

export default TypewriterText;