import React from 'react'
import { motion } from 'framer-motion'

import Marquee from './marquee'
import Icon from './icon'

const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }

const PageTransition = () => {
  return (
    <motion.div
      key="loader"
      className="panel-swipe"
      initial={{
        clipPath: `inset(100% 0 0 0)`,
      }}
      animate={{
        clipPath: [`inset(100% 0 0 0)`, `inset(0% 0 0 0)`],
      }}
      exit={{
        clipPath: `inset(0 0 100% 0)`,
      }}
      transition={transition}
    >
      <div className="panel-swipe--content">
        <Icon name="666" viewBox="0 0 666 666" />
      </div>
      <div className="panel-swipe--bg">
        <Marquee line="Loading&nbsp;" className="is-inverted is-large" />
        <Marquee
          reverse
          line="Loading&nbsp;"
          className="is-inverted is-large"
        />
      </div>
    </motion.div>
  )
}

export default PageTransition
