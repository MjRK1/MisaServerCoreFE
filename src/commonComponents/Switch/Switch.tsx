import { motion, MotionStyle } from 'motion/react';
import React from 'react';
import cn from 'classnames';
import { ISwitch } from 'types/commonComponents';

export const Switch = (props: ISwitch) => {
  const { isOn, size = 's', style, onClick } = props;
  return (
    <motion.div
      layout
      className={cn('switch', {
        'small': size === 's',
        'medium': size === 'm',
        'large': size === 'l',
        'on': isOn,
        'off': !isOn
      })}
      onClick={onClick}
      style={style as MotionStyle}
    >
      <motion.div
        layout
        className={cn('circle', {
          'small': size === 's',
          'medium': size === 'm',
          'large': size === 'l',
          'on': isOn,
          'off': !isOn,
        })}
      />
    </motion.div>
  );
};
