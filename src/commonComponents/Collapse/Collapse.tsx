import React from 'react';
import { m, LazyMotion, domAnimation } from 'motion/react';
import { ICollapseProps } from 'types/commonComponents';

export const Collapse = (props: ICollapseProps) => {
  const {
    isOpen,
    children,
    header
  } = props;

  const animate = {
    transition: {type: 'tween'},
    height: isOpen ? 'auto' : 0
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div aria-expanded={isOpen}>
        {header}
        <m.div
          style={{overflow: 'hidden'}}
          initial={{height: 0, opacity: 1}}
          animate={animate}
          exit={{height: 0, opacity: 1}}
        >
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
};
