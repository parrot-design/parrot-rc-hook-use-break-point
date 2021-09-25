import { useState, useEffect } from 'react';

const responsiveArray = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px) and (max-width:767px)',
    md: '(min-width: 768px) and (max-width:991px)',
    lg: '(min-width: 992px) and (max-width:1199px)',
    xl: '(min-width: 1200px) and (max-width:1599px)',
    xxl: '(min-width: 1600px)'
};
const subscribers = new Map();
let subUid = -1;
let screens = {};
let NoMatchScreens = {};
responsiveArray.forEach((breakpoint) => {
    NoMatchScreens[breakpoint] = false;
});
const responsiveObserve = {
    matchHandlers: {},
    dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach(func => func(screens));
        return subscribers.size >= 1;
    },
    subscribe(func) {
        if (!subscribers.size)
            this.register();
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
    },
    unsubscribe(token) {
        subscribers.delete(token);
        if (!subscribers.size)
            this.unregister();
    },
    unregister() {
        Object.keys(responsiveMap).forEach((screen) => {
            const matchMediaQuery = responsiveMap[screen];
            const handler = this.matchHandlers[matchMediaQuery];
            handler === null || handler === void 0 ? void 0 : handler.mql.removeListener(handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
    },
    register() {
        Object.keys(responsiveMap).forEach((screen) => {
            const matchMediaQuery = responsiveMap[screen];
            const listener = ({ matches }) => {
                if (matches) {
                    this.dispatch(Object.assign(Object.assign({}, NoMatchScreens), { [screen]: matches }));
                }
            };
            const mql = window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            this.matchHandlers[matchMediaQuery] = {
                mql,
                listener
            };
            listener(mql);
        });
    }
};

function useBreakpoint() {
    const [screens, setScreens] = useState({});
    useEffect(() => {
        const token = responsiveObserve.subscribe(supportScreens => {
            setScreens(supportScreens);
        });
        return () => responsiveObserve.unsubscribe(token);
    }, []);
    return screens;
}

export { useBreakpoint as default };
