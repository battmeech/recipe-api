import { actions } from 'ducks/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Quick wrapper method, will check the inner width of the page to see if it is a mobile device viewing it */
export function useCheckMobile() {
    const dispatch = useDispatch();

    const checkMobile = () => {
        if (window.innerWidth < 900) {
            dispatch(actions.isMobile());
        } else {
            dispatch(actions.isNotMobile());
        }

        if (window.scrollY < 10) {
            dispatch(actions.isTop());
        } else {
            dispatch(actions.isNotTop());
        }
    };

    useEffect(() => {
        checkMobile();
    });
}
