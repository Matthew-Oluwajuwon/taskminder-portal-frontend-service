/* eslint-disable prettier/prettier */
export const formMotion = () => {
  return {
    hidden: { scale: 0 },
    show: { scale: 1,
        transition: {
          duration: 0.5,
          delay: 0.4,
          type: "tween",
          stiffness: 200,
        }
     }
  }
}

export const listMotion = () => {
  return {
    hidden:{ opacity: 0, scale: 0.5 },
        show: { opacity: 1, scale: 1,
          transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
          whileHover: { scale: 1 }
         },
  }
}

export const staggeredListMotion = () => {
  return {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
        type: "spring",
      },
    },
  } 
}

export const staggeredChildren = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }