import { AnimatePresence, motion } from "framer-motion";
const AnimationWrapper = ({
  children,
  className,
  keyValue,
  intial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={intial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
