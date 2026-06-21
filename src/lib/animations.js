export const morphSpring = {
  type: "spring",
  stiffness: 380,
  damping: 22,
};

export const contentBlurExit = {
  duration: 0.2,
  ease: "easeInOut",
};

export const contentBlurEnter = {
  duration: 0.3,
  ease: "easeInOut",
  delay: 0.15,
};

export const iconBlurExit = {
  duration: 0.08,
  ease: "easeOut",
};

export const iconBlurEnter = {
  duration: 0.1,
  ease: "easeOut",
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: "easeOut" },
};
