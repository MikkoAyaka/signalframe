const sparxEase = [0.22, 1, 0.36, 1] as const;
const sparxSettle = [0.16, 1, 0.3, 1] as const;

export const sparxMotion = {
  feedback: {
    duration: 0.18,
    ease: sparxEase,
  },
  emphasis: {
    duration: 0.26,
    ease: sparxEase,
  },
  reveal: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.32, ease: sparxEase },
  },
  spatial: {
    initial: { opacity: 0, scale: 0.985, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.015, y: -8 },
    transition: { duration: 0.42, ease: sparxSettle },
  },
} as const;

export type SparxMotionPreset = keyof typeof sparxMotion;
