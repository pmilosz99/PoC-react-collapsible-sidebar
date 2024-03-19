import { CSSProperties, ReactNode } from "react";

export enum SIDEBAR_STATE {
    OPEN = 'open',
    CLOSED = 'closed',
}

export const SIZE_VALUE = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
    XLARGE: 'xlg',
    FULL: 'full',
} as const;

export const POSITION_VALUE = {
    LEFT: 'left',
    RIGHT: 'right',
} as const;

export const TRANSITION_TYPE = {
    FAST: 'fast',
    SLOW: 'slow',
    EASY: 'easy',
    DRAGGING: 'dragging',
} as const;

export type Size = (typeof SIZE_VALUE)[keyof typeof SIZE_VALUE];

export type Position = (typeof POSITION_VALUE)[keyof typeof POSITION_VALUE];

export type Transition = (typeof TRANSITION_TYPE)[keyof typeof TRANSITION_TYPE];

export interface SidebarProps {
    /**
     * id: the unique string of component
     */
    id: string;
    /**
     * Boolean value to open component
     */
    isOpen: boolean;
    /**
     * Function to close component () => !isOpen
     */
    onClose: () => void;
    /**
     * Children to render in component
     */
    children: ReactNode;
    /**
     * Object of custom container style
     */
    customStyles?: CSSProperties;
    /**
     * Reference to component
     */
    ref?: HTMLDivElement | null;
    /**
     * Reference to the node in which the sidebar is to be rendered (only work with property isCreatePortal={true})
     */
    nodeRef?: HTMLElement;
    /**
     * Component rendering position left or right
     * 
     * @default 'left'
     */
    position?: Position;
    /**
     * The size of component
     * 
     * @default 'md'
     */
    size?: Size;
    /**
     * The type of animation used in the component
     * 
     * @default 'fast'
     */
    transition?: Transition;
    /**
     * Boolean value to create react portal
     * 
     * @default true
     */
    isCreatePortal?: boolean;
    /**
     * Boolean value to render darkned background
     * 
     * @default false
     */
    isRenderBackground?: boolean;
    /**
     * Boolean value to make the component close when clicked outside its area
     * 
     * @default true
     */
    isCloseOnOverlayClick?: boolean;
}
