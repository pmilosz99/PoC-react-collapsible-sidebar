import { SIZE_VALUE, Size, TRANSITION_TYPE, Transition } from "./types";

export const isClickedButton = (event: MouseEvent) => (event.target as HTMLElement).localName === 'button';

export const getTransition = (transitionType: Transition) => {
    switch (transitionType) {
        case TRANSITION_TYPE.SLOW: return { duration: 0.5 };

        case TRANSITION_TYPE.FAST: return { duration: 0.1 };

        case TRANSITION_TYPE.EASY: return { duration: 0.5 };

        case TRANSITION_TYPE.DRAGGING: return { };
    }
};

export const getSize = (size: Size) => {
    switch (size) {
        case SIZE_VALUE.SMALL: return '100px';

        case SIZE_VALUE.MEDIUM: return '200px';

        case SIZE_VALUE.LARGE: return '300px';

        case SIZE_VALUE.XLARGE: return '500px';

        case SIZE_VALUE.FULL: return '100vw';
    }
};
