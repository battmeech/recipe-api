import { appActions } from 'ducks/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'ts-debounce';

/**
 * Quick wrapper method, will check the inner width of the page to see if it is a mobile device viewing it
 */
export function useCheckScroll() {
    const dispatch = useDispatch();

    // Create a function to monitor the size of the window
    const monitorScroll = () => {
        console.log('here')
        dispatch(appActions.setIsTop(window.scrollY < 10));
    };

    // Create a debounce function
    const monitorScrollDebounce = debounce(monitorScroll, 200, {
        isImmediate: true,
    });

    useEffect(
        () => {
            // Execute immediately
            monitorScroll();

            // Add an event listener
            window.addEventListener('scroll', monitorScrollDebounce);

            // Remove the event listener on unmount
            return () => {
                window.removeEventListener('scroll', monitorScrollDebounce);
            };
        },
        // eslint-disable-next-line
        []
    );
}
