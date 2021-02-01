import { appActions } from 'ducks/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'ts-debounce';

/**
 * Quick wrapper method, will check the inner width of the page to see if it is a mobile device viewing it
 */
export function useIsMobile() {
    const dispatch = useDispatch();

    // Create a function to monitor the size of the window
    const monitorSize = () => {
        dispatch(appActions.setIsMobile(window.innerWidth < 900));
    };

    // Create a debounce function
    const monitorSizeDebounce = debounce(monitorSize, 200, {
        isImmediate: true,
    });

    useEffect(
        () => {
            // Execute immediately
            monitorSize();

            // Add an event listener
            window.addEventListener('resize', monitorSizeDebounce);

            // Remove the event listener on unmount
            return () => {
                window.removeEventListener('resize', monitorSizeDebounce);
            };
        },
        // eslint-disable-next-line
        []
    );
}
