import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from 'commonComponents/Button';
import { CloseOutlined } from '@ant-design/icons';


export const Modal = (props: IModal) => {
  const {
    isOpen,
    title,
    width = 460,
    withCross,
    withSuccess,
    successText,
    onClose,
    onSuccess,
    children,
  } = props;

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.1,
        delay: 0
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.1,
        delay: 0,
      }
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-container">
          <motion.div
            className="modal"
            style={{ width }}
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <div className="modal-header__title">
                {title}
              </div>
              {withCross && (
                <motion.div
                  className="modal-header__close-btn"
                  onClick={onClose}
                  whileHover={{rotate: -90, transition: { duration: 0.3, type: 'tween'}}}
                >
                  <CloseOutlined />
                </motion.div>
              )}
            </div>
            <div className="modal-content">
              {children}
            </div>
            {withSuccess && (
              <div className="modal-footer">
                <Button
                  style={{ width: '100%' }}
                  onClick={onSuccess}
                >
                  {successText as string}
                </Button>
              </div>
            )}
          </motion.div>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="modal-overlay"
            onClick={() => onClose()}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
