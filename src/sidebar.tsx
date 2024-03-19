import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, Variant, Variants, motion } from "framer-motion";

import { Portal } from "./portal";

import { getSize, getTransition, isClickedButton } from "./utils";

import { defaultSidebarStyle } from "./default-style";

import { 
  Position, 
  SIDEBAR_STATE, 
  SidebarProps, 
  POSITION_VALUE, 
  TRANSITION_TYPE, 
  SIZE_VALUE } from "./types";

export const Sidebar: React.FC<SidebarProps> = ({
  id,
  ref,
  isOpen,
  onClose,
  children,
  nodeRef,
  customStyles,
  isCreatePortal = true,
  isRenderBackground = false,
  isCloseOnOverlayClick = true,
  size = SIZE_VALUE.MEDIUM,
  position = POSITION_VALUE.LEFT,
  transition = TRANSITION_TYPE.FAST,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(ref as unknown as HTMLDivElement);

  const targetSize = customStyles?.width || getSize(size);
  const targetTransition = getTransition(transition);
  const node: HTMLElement = nodeRef ?? document.body;

  const sidebarStyle: React.CSSProperties = {
    ...defaultSidebarStyle,
    ...customStyles,
    width: targetSize,
  };

  const handleClickOutside = () => {
    if (!isCloseOnOverlayClick) return;
  
    document.addEventListener("mousedown", onClickOutsideListener);
  
    return () => {
      document.removeEventListener("mousedown", onClickOutsideListener);
    };
  };
  
  const onClickOutsideListener = useCallback((event: MouseEvent): void => {
    if (!containerRef.current) return;

    if (!isClickedButton(event) && !containerRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);
  
  useEffect(handleClickOutside, [isCloseOnOverlayClick, onClickOutsideListener]);

  const initialCss: Record<Position, Variant> = {
    [POSITION_VALUE.LEFT]: { x: `-${targetSize}` },
    [POSITION_VALUE.RIGHT]: { 
      right: 0,
      x: targetSize
    },
  };
  
  const variants: Variants = {
    [SIDEBAR_STATE.CLOSED]: initialCss[position],
    [SIDEBAR_STATE.OPEN]: {
      x: 0,
    },
  };

  const containerToRenderWithPortal: JSX.Element = 
    <motion.div
      id={id}
      ref={containerRef}
      initial={SIDEBAR_STATE.CLOSED}
      animate={SIDEBAR_STATE.OPEN}
      exit={SIDEBAR_STATE.CLOSED}
      variants={variants}
      style={sidebarStyle}
      transition={targetTransition}
    >
      {children}
    </motion.div>

  const conatinerToRenderWithoutPortal: JSX.Element = 
    <motion.div
      id={id}
      ref={containerRef}
      initial={SIDEBAR_STATE.CLOSED}
      animate={isOpen ? SIDEBAR_STATE.OPEN : SIDEBAR_STATE.CLOSED}
      variants={variants}
      style={sidebarStyle}
      transition={targetTransition}
    >
      {children}
    </motion.div>

  const darkenedBackground =
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      exit={{ opacity: 0 }}
      transition={targetTransition}
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'black',
      }}
    />

  const renderBackground = () => isRenderBackground ? darkenedBackground : null;

  if (isCreatePortal) {
    return (
      <AnimatePresence>
         {isOpen ? (
          <Fragment>
            {renderBackground()}
            <Portal container={node}>
              {containerToRenderWithPortal}
            </Portal>
          </Fragment>
        ) : null}
      </AnimatePresence>
    )
  }

  return (
    <Fragment>
      <AnimatePresence>
        {isOpen && renderBackground()}
      </AnimatePresence>
    {conatinerToRenderWithoutPortal}
    </Fragment>
  )
};

export default Sidebar;
