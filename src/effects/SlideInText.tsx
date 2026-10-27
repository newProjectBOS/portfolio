'use client';
import { motion } from "motion/react";

const SlideInText = ({ text = "Simplicity is the ultimate sophistication.", className = "", delay = 0 }: { text?: string; className?: string; delay?: number }) => {
    return (
        <h2 className={`text-2xl md:text-4xl font-bold text-white ${className}`}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: delay + i * 0.03, ease: "easeOut" }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </h2>
    );
};

export default SlideInText;
