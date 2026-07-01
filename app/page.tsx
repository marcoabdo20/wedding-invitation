"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Church,
  MapPin,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  ChevronDown,
  Sparkles,
  Star,
  Crown,
  Navigation,
  ExternalLink,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "petal" | "sparkle" | "heart";
  opacity: number;
}

// ─── Constants ───────────────────────────────────────────
const WEDDING_DATE = new Date("2026-07-19T19:00:00");

// ─── Church Location ─────────────────────────────────────
const CHURCH_LOCATION = {
  name: "كنيسة مارمرقس",
  address: "ساحل طما، أسيوط",
  lat: 26.8206,
  lng: 31.4195,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=كنيسة+مارمرقس+ساحل+طما+أسيوط",
  phone: "",
};

// ─── Reception Location ──────────────────────────────────
const RECEPTION_LOCATION = {
  name: "قاعة وادي النخيل",
  address: "طما، أسيوط",
  lat: 26.8206,
  lng: 31.4195,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=قاعة+وادي+النخيل+طما+أسيوط",
  phone: "",
};

// ─── Animated Living Background ──────────────────────────
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50/50 to-pink-100/30" />

      <motion.div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.35), transparent 70%)" }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -10, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -left-40 w-[380px] h-[380px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,207,232,0.45), transparent 70%)" }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 w-[460px] h-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(190,24,93,0.18), transparent 70%)" }}
        animate={{
          x: [0, 25, -35, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 45%, transparent 60%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ─── Floral Corner Decorations ───────────────────────────
function FloralCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotations = {
    "top-left": "rotate(0deg)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-30"
      style={{
        [position.includes("top") ? "top" : "bottom"]: "-20px",
        [position.includes("left") ? "left" : "right"]: "-20px",
        width: "180px",
        height: "180px",
        transform: rotations[position],
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 1.5, type: "spring" }}
    >
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-40">
        <defs>
          <linearGradient id={`cornerGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 Q90,20 160,0 Q140,90 160,180 Q90,140 0,180 Q20,90 0,0Z"
          fill={`url(#cornerGrad-${position})`}
          opacity="0.3"
        />
        <circle cx="30" cy="30" r="8" fill="#F9A8D4" opacity="0.5" />
        <circle cx="50" cy="15" r="5" fill="#EC4899" opacity="0.4" />
        <circle cx="15" cy="50" r="6" fill="#F472B6" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

// ─── Couple Hero Photo ────────────────────────────────────
function CoupleHeroPhoto() {
  return (
    <motion.div
      className="relative flex flex-col items-center mb-6"
      initial={{ opacity: 0, y: -30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.2, type: "spring", bounce: 0.35 }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-3 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #F9A8D4, #FDE68A, #EC4899, #F9A8D4)",
            filter: "blur(2px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute -inset-6 rounded-full bg-pink-300/30 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px] border-white shadow-2xl shadow-pink-300/50">
          <img
            src="/images/1.jpeg"
            alt="ريمون و مادلين"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop";
            }}
          />
        </div>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: i === 0 ? "-8px" : i === 1 ? "40%" : "auto",
              bottom: i === 2 ? "-6px" : "auto",
              left: i === 1 ? "-14px" : "auto",
              right: i === 0 ? "6px" : i === 2 ? "0px" : "auto",
            }}
            animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.6 }}
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Elegant Welcome Sentence ─────────────────────────────
function WelcomeMessage() {
  return (
    <motion.div
      className="text-center px-8 mb-8 max-w-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 1 }}
    >
      <motion.p
        className="text-pink-800/90 text-base md:text-lg font-serif leading-loose"
        style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', serif" }}
      >
        بقلوبٍ يملؤها الشكر، وخُطى تُبارَك من فوق، ندعوكم لنكون جزءًا من
        أجمل فصول حكايتنا
      </motion.p>
      <motion.div
        className="flex items-center justify-center gap-2 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="h-px w-8 bg-pink-400/40" />
        <Sparkles className="w-3.5 h-3.5 text-pink-400/70" />
        <div className="h-px w-8 bg-pink-400/40" />
      </motion.div>
    </motion.div>
  );
}

// ─── Star Button Component ────────────────────────────────
function StarButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
    >
      <div className="absolute inset-0 rounded-full bg-pink-400/20 blur-2xl animate-pulse" />

      <svg
        viewBox="0 0 200 200"
        className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9A8D4" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M100,10 L123,70 L190,75 L140,115 L155,180 L100,145 L45,180 L60,115 L10,75 L77,70 Z"
          fill="url(#starGrad)"
          stroke="#FCE7F3"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <circle cx="100" cy="100" r="35" fill="none" stroke="#FCE7F3" strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="100" r="25" fill="none" stroke="#FCE7F3" strokeWidth="1" opacity="0.4" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        >
          <img
            src="/images/2.jpeg"
            alt="ريمون و مادلين"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop";
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-pink-700 text-sm font-medium whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        اضغط لفتح الدعوة
      </motion.div>
    </motion.button>
  );
}

// ─── Floating Particles ──────────────────────────────────
function FloatingParticles() {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const types: ("petal" | "sparkle" | "heart")[] = ["petal", "sparkle", "heart"];
    const newParticles: FloatingParticle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 25 + 8,
      duration: Math.random() * 20 + 12,
      delay: Math.random() * 15,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ top: "110%", opacity: 0, rotate: 0 }}
          animate={{
            top: "-10%",
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 360, 720],
            x: [0, Math.sin(p.id) * 60, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.type === "petal" && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, #FBCFE8, #EC4899)`,
                transform: "rotate(45deg)",
              }}
            />
          )}
          {p.type === "sparkle" && (
            <Star className="w-full h-full text-pink-300" fill="currentColor" />
          )}
          {p.type === "heart" && (
            <Heart className="w-full h-full text-rose-400" fill="currentColor" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Cinematic Transition Overlay ────────────────────────
function TransitionOverlay() {
  const burstItems = Array.from({ length: 24 }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.2, delay: 1.2 }}
    >
      {/* Flash of light */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(253,242,248,0.8) 30%, rgba(249,168,212,0.3) 60%, transparent 80%)",
        }}
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 4, opacity: [0, 1, 0.8, 0] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Expanding ring of hearts/stars */}
      {burstItems.map((i) => {
        const angle = (i / burstItems.length) * 2 * Math.PI;
        const distance = 300 + Math.random() * 100;
        const size = 8 + Math.random() * 16;
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0],
              rotate: 720,
            }}
            transition={{ duration: 1.8, delay: 0.03 * i, ease: "easeOut" }}
          >
            {i % 3 === 0 ? (
              <Heart className="text-rose-400 fill-rose-400" style={{ width: size, height: size }} />
            ) : i % 3 === 1 ? (
              <Star className="text-pink-300 fill-pink-300" style={{ width: size, height: size }} />
            ) : (
              <Sparkles className="text-yellow-300 fill-yellow-300" style={{ width: size, height: size }} />
            )}
          </motion.div>
        );
      })}

      {/* Rotating golden ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-2 border-pink-300/40"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1.5], rotate: 360, opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.div
        className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-yellow-300/30"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1.3], rotate: -360, opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.2, delay: 0.1, ease: "easeOut" }}
      />

      {/* Closing veil wipe */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ─── Location Card Component ─────────────────────────────
function LocationCard({
  location,
  delay,
}: {
  location: typeof CHURCH_LOCATION;
  delay: number;
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden backdrop-blur-md border border-pink-200/30 shadow-xl bg-white/60"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, type: "spring" }}
    >
      {/* Map Preview Area */}
      <div className="relative h-48 bg-gradient-to-br from-pink-100/50 to-rose-50/50 overflow-hidden">
        {/* Decorative Map Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`mapGrid-${location.name}`} width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#EC4899" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#mapGrid-${location.name})`} />
          </svg>
        </div>

        {/* Decorative circles on map */}
        <motion.div
          className="absolute top-4 left-4 w-3 h-3 rounded-full bg-pink-300/40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-12 right-8 w-2 h-2 rounded-full bg-rose-300/40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-8 left-12 w-2.5 h-2.5 rounded-full bg-pink-400/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        {/* Location Pin Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-8 bg-pink-400/20 rounded-full blur-xl" />
            <motion.div
              className="absolute -inset-4 bg-rose-400/10 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <MapPin className="w-12 h-12 text-rose-500 relative z-10 drop-shadow-lg" strokeWidth={2} />
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-rose-500/20 rounded-full blur-sm"
              animate={{ scaleX: [1, 1.8, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Location Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent pt-10 pb-4 px-5">
          <h4 className="text-pink-900 font-bold text-lg text-right">{location.name}</h4>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-pink-100/50 flex-shrink-0">
            <Navigation className="w-5 h-5 text-pink-600" />
          </div>
          <p className="text-pink-800/80 text-sm leading-relaxed text-right flex-1 pt-1">
            {location.address}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-2xl font-medium text-sm shadow-lg shadow-pink-500/25"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>فتح في خرائط Google</span>
          </motion.a>
        </div>

        {/* Copy Address Button */}
        <motion.button
          onClick={() => {
            navigator.clipboard.writeText(location.address);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-pink-600/70 text-sm hover:bg-pink-50/50 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          <MapPin className="w-4 h-4" />
          <span>{isCopied ? "✓ تم النسخ!" : "نسخ العنوان"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Event Card ────────────────────────────────────────
function EventCard({
  icon: Icon,
  title,
  time,
  location,
  address,
  delay,
  isReception = false,
}: {
  icon: React.ElementType;
  title: string;
  time: string;
  location: string;
  address: string;
  delay: number;
  isReception?: boolean;
}) {
  return (
    <motion.div
      className={`relative rounded-3xl p-6 md:p-8 backdrop-blur-md border transition-all duration-500 overflow-hidden ${
        isReception
          ? "bg-gradient-to-br from-pink-50/80 to-rose-50/60 border-pink-300/40 shadow-2xl shadow-pink-200/30"
          : "bg-white/60 border-pink-200/30 shadow-xl"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="#EC4899" opacity="0.3" />
          <circle cx="30" cy="30" r="15" fill="#F9A8D4" opacity="0.4" />
          <circle cx="70" cy="30" r="15" fill="#F9A8D4" opacity="0.4" />
          <circle cx="30" cy="70" r="15" fill="#F9A8D4" opacity="0.4" />
          <circle cx="70" cy="70" r="15" fill="#F9A8D4" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-3xl">
        <div className="absolute top-2 right-2">
          <Sparkles className="w-5 h-5 text-pink-400/60" />
        </div>
      </div>

      <div className="flex items-start gap-4 relative z-10">
        <div className={`p-3 rounded-2xl ${isReception ? "bg-pink-500/20" : "bg-pink-100/50"}`}>
          <Icon className="w-6 h-6 text-pink-600" />
        </div>
        <div className="flex-1 text-right">
          <h3 className="text-xl md:text-2xl font-bold text-pink-900 mb-2">{title}</h3>
          <div className="flex items-center gap-2 text-pink-700/80 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-lg font-medium">{time}</span>
          </div>
          <div className="flex items-center gap-2 text-pink-700/70 mb-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <p className="text-pink-800/60 text-sm mt-2 leading-relaxed">{address}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
    </motion.div>
  );
}

// ─── Music Player ──────────────────────────────────────
function MusicPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-pink-950/80 backdrop-blur-md border border-pink-400/30 shadow-2xl shadow-pink-900/30"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1"
          >
            <div className="w-1 h-4 bg-pink-400 rounded-full animate-pulse" />
            <div className="w-1 h-6 bg-pink-400 rounded-full animate-pulse delay-75" />
            <div className="w-1 h-3 bg-pink-400 rounded-full animate-pulse delay-150" />
          </motion.div>
        ) : (
          <motion.div key="muted" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <VolumeX className="w-5 h-5 text-pink-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Parents Section ─────────────────────────────────────
function ParentsSection() {
  const parents = [
    { name: "المعلم أبو سمرة عزمى", side: "والد العريس" },
    { name: "المعلم أيمن نص", side: "والد العروس" },
  ];

  return (
    <motion.div
      className="text-center mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="text-pink-700/90 text-lg mb-6 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        ويتشرف كلٌّ من
      </motion.p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3">
        {parents.map((p, i) => (
          <motion.div
            key={p.name}
            className="relative flex-1 w-full sm:w-auto"
            initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7, type: "spring" }}
          >
            <motion.div
              className="relative rounded-2xl px-6 py-5 bg-white/50 backdrop-blur-sm border border-pink-200/40 shadow-lg overflow-hidden group"
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 15px 35px rgba(236,72,153,0.25)" }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <motion.div
                className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle, rgba(249,168,212,0.4), transparent 70%)" }}
              />
              <div className="flex justify-center mb-2">
                <Crown className="w-5 h-5 text-pink-400/70" />
              </div>
              <p className="text-xs text-pink-500/70 mb-1 tracking-wide">{p.side}</p>
              <p className="text-pink-900 text-xl md:text-2xl font-bold">{p.name}</p>
              <div className="mt-2 h-px w-10 mx-auto bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="hidden sm:flex justify-center -mt-16 relative z-10"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="w-9 h-9 rounded-full bg-white shadow-md border border-pink-200/60 flex items-center justify-center">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Countdown Timer ─────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: "أيام" },
    { value: timeLeft.hours, label: "ساعات" },
    { value: timeLeft.minutes, label: "دقائق" },
    { value: timeLeft.seconds, label: "ثواني" },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-5 my-8">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 * i }}
        >
          <div 
            className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-2xl bg-white/20 backdrop-blur-sm border border-pink-200/40 flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(251,207,232,0.1))" }}
          >
            <span className="text-xl md:text-2xl font-bold text-pink-900 font-mono">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-pink-700/80 mt-2 font-medium">{unit.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Locations Section ───────────────────────────────────
function LocationsSection() {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50" />
          <MapPin className="w-6 h-6 text-pink-500" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-pink-900 mb-2">موقع المناسبة</h2>
        <p className="text-pink-700/60 text-sm">اضغط على الزر للوصول إلى الموقع عبر خرائط Google</p>
      </motion.div>

      {/* Location Cards */}
      <div className="space-y-6">
        {/* Church Location */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <Church className="w-5 h-5 text-pink-600" />
            <span className="text-pink-800 font-bold text-lg">موقع الكنيسة</span>
          </div>
          <LocationCard location={CHURCH_LOCATION} delay={0} />
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-400/20" />
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-pink-400/50" />
          </motion.div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-400/20" />
        </div>

        {/* Reception Location */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <Sparkles className="w-5 h-5 text-pink-600" />
            <span className="text-pink-800 font-bold text-lg">موقع قاعة الاستقبال</span>
          </div>
          <LocationCard location={RECEPTION_LOCATION} delay={0.1} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Invitation Content ───────────────────────────
function InvitationContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      <motion.div
        className="relative z-20 max-w-2xl mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {/* Top floral decoration */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <svg viewBox="0 0 120 120" className="w-32 h-32 opacity-80" style={{ filter: "drop-shadow(0 4px 8px rgba(236,72,153,0.3))" }}>
            <defs>
              <linearGradient id="topFloral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" fill="url(#topFloral)" opacity="0.2" />
            <circle cx="60" cy="60" r="35" fill="none" stroke="#EC4899" strokeWidth="2" opacity="0.3" />
            <path d="M60,10 Q80,40 110,60 Q80,80 60,110 Q40,80 10,60 Q40,40 60,10Z" fill="#F9A8D4" opacity="0.4" />
            <circle cx="60" cy="60" r="15" fill="#EC4899" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Bible Verse Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50" />
            <Sparkles className="w-5 h-5 text-pink-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50" />
          </div>

          <motion.p
            className="text-pink-800/80 text-base md:text-lg leading-loose font-serif italic px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            &ldquo;الآنَ قَدِ اخْتَرْتُ وَقَدَّسْتُ هذَا الْبَيْتَ لِيَكُونَ اسْمِي فِيهِ إِلَى الأَبَدِ، وَتَكُونُ عَيْنَايَ وَقَلْبِي هُنَاكَ كُلَّ الأَيَّامِ&rdquo;
          </motion.p>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <motion.div
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent"
              style={{
                fontFamily: "'Great Vibes', cursive",
                backgroundImage: "linear-gradient(135deg, #BE185D, #EC4899, #F472B6)",
                filter: "drop-shadow(0 2px 6px rgba(190,24,93,0.25))",
              }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              ريمون
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-500 fill-rose-500" />
            </motion.div>

            <motion.div
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent"
              style={{
                fontFamily: "'Great Vibes', cursive",
                backgroundImage: "linear-gradient(135deg, #BE185D, #EC4899, #F472B6)",
                filter: "drop-shadow(0 2px 6px rgba(190,24,93,0.25))",
              }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              مادلين
            </motion.div>
          </div>

          <motion.div
            className="h-px w-40 mx-auto mb-4"
            style={{ background: "linear-gradient(90deg, transparent, #EC4899, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Star className="w-6 h-6 text-pink-400/60" fill="currentColor" />
            <Heart className="w-6 h-6 text-rose-400/60" fill="currentColor" />
            <Star className="w-6 h-6 text-pink-400/60" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Second Bible Verse */}
        <motion.div
          className="text-center mb-10 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-pink-700/70 text-sm md:text-base leading-loose font-serif">
            &ldquo;اِمْرَأَتُكَ مِثْلُ كَرْمَةٍ مُثْمِرَةٍ فِي جَوَانِبِ بَيْتِكَ. بَنُوكَ مِثْلُ غُرُوسِ الزَّيْتُونِ حَوْلَ مَائِدَتِكَ.&rdquo;
          </p>
        </motion.div>

        {/* Parents Section */}
        <ParentsSection />

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-400/30" />
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </motion.div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-400/30" />
        </div>

        {/* Date & Countdown */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-300/30 mb-6">
            <Calendar className="w-5 h-5 text-pink-600" />
            <span className="text-pink-900 text-lg font-medium">
              الأحد، 19 يوليو 2026
            </span>
          </div>

          <p className="text-pink-700/60 text-sm mb-4">بمشيئة الرب</p>

          <CountdownTimer />
        </motion.div>

        {/* Events */}
        <div className="space-y-6 mb-12">
          <EventCard
            icon={Church}
            title="القداس الإلهي"
            time="7:00 مساءً"
            location="كنيسة مارمرقس"
            address="ساحل طما"
            delay={0}
          />

          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-pink-400/60" />
            </motion.div>
          </div>

          <EventCard
            icon={MapPin}
            title="حفل الاستقبال"
            time="8:00 مساءً"
            location="قاعة وادي النخيل"
            address="طما"
            delay={0.2}
            isReception
          />
        </div>

        {/* ─── LOCATIONS SECTION ───────────────────────── */}
        <LocationsSection />

        {/* Footer */}
        <motion.div
          className="text-center pb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400/30" />
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400/30" />
          </div>
          <p className="text-pink-700/50 text-sm">
            نتشرف بحضوركم لمشاركتنا فرحتنا
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────
export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/widding.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleOpen = useCallback(() => {
    setIsTransitioning(true);
    setIsOpen(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 400);
    setTimeout(() => setIsTransitioning(false), 2500);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden" dir="rtl">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 30%, #fbcfe8 60%, #f9a8d4 100%)",
            }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(6px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="floralPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="20" fill="#EC4899" opacity="0.1" />
                    <circle cx="10" cy="10" r="5" fill="#F9A8D4" opacity="0.15" />
                    <circle cx="50" cy="50" r="5" fill="#F9A8D4" opacity="0.15" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#floralPattern)" />
              </svg>
            </div>

            <FloatingParticles />

            <motion.div
              className="absolute top-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400/50" />
                <Heart className="w-6 h-6 text-pink-500/60 fill-pink-500/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400/50" />
              </div>
            </motion.div>

            <CoupleHeroPhoto />
            <WelcomeMessage />
            <StarButton onClick={handleOpen} />

            <motion.div
              className="absolute bottom-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className="text-pink-700/50 text-sm">دعوة زفاف</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <InvitationContent />
            <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{isTransitioning && <TransitionOverlay />}</AnimatePresence>
    </main>
  );
}