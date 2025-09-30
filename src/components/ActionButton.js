import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const buttonVariants = {
    rest: {
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
        },
    },
    hover: {
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
        },
    },
};

const innerContainerVariants = {
  rest: {
    x: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hover: {
    x: -13,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const iconVariants = {
    rest: {
        x: 15,
        opacity: 0,
        marginLeft: 0,
        scale: 0.6,
        transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.15,
        },
    },
    hover: {
        x: 10,
        opacity: 1,
        marginLeft: "1rem",
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 20,
        },
    },
};

const ActionButton = ({ href = "#", text = "Click Me", icon: Icon = FiExternalLink }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      className="relative flex items-center justify-center w-36 py-2 px-4 md:px-5 bg-purple rounded-full font-redditMono text-base md:text-lg font-bold tracking-widest uppercase overflow-hidden"
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      layout
    >
        <motion.div
            className="relative flex items-center justify-center text-center"
            variants={innerContainerVariants}
        >
            <motion.span className="relative text-center" layout="position">
                {text}
            </motion.span>
            <motion.span
                variants={iconVariants}
                className="absolute right-0 translate-x-[100%]"
                aria-hidden="true"
            >
                <Icon className="w-5 h-5" />
            </motion.span>
        </motion.div>
    </motion.a>
  );
};

export default ActionButton;