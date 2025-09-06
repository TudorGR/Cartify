import { motion, useReducedMotion } from "framer-motion";
import { useContext } from "react";
import type { Variants } from "framer-motion";
import { useNavigation } from "../../../context/navigationContext";
import { UserContext } from "../../../context/userContext";

const createPageVariants = (
  direction: "left" | "right",
  shouldAnimate: boolean,
  prefersReducedMotion: boolean
): Variants => {
  // No animation at all (same page type or explicitly disabled)
  if (!shouldAnimate) {
    return {
      initial: { opacity: 1, x: 0, scale: 1 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 1, x: 0, scale: 1 },
    };
  }

  // Respect reduced motion: use a quick subtle crossfade
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: 0.18, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.14, ease: "easeIn" },
      },
    };
  }

  const isLeftDirection = direction === "left";
  const enterOffset = isLeftDirection ? 56 : -56; // subtle, not jarring
  const exitOffset = isLeftDirection ? -48 : 48;

  return {
    initial: {
      opacity: 0,
      x: enterOffset,
      scale: 0.995, // slight depth cue
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 32,
        mass: 0.9,
      },
    },
    exit: {
      opacity: 0,
      x: exitOffset,
      scale: 0.995,
      transition: {
        duration: 0.22,
        ease: "easeInOut",
      },
    },
  };
};

interface PageAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageAnimationWrapper: React.FC<PageAnimationWrapperProps> = ({
  children,
  className = "h-full w-full",
}) => {
  const { direction, shouldAnimate } = useNavigation();
  const prefersReducedMotion = !!useReducedMotion();
  const { lightMode } = useContext(UserContext);

  const pageVariants = createPageVariants(
    direction,
    shouldAnimate,
    prefersReducedMotion
  );

  return (
    <motion.div
      key={
        shouldAnimate
          ? `${direction}${prefersReducedMotion ? "-reduced" : ""}`
          : "no-animation"
      }
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      style={{
        willChange: "transform, opacity",
        // Match app theme to avoid flashes between light/dark during transitions
        backgroundColor: lightMode ? "#ffffff" : "#0a0a0a",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimationWrapper;
