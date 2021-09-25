export declare type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export declare type BreakpointMap = Record<Breakpoint, string>;
export declare type ScreenMap = Partial<Record<Breakpoint, string>>;
export declare type ScreenSizeMap = Partial<Record<Breakpoint, number>>;
export declare const responsiveArray: Breakpoint[];
export declare const responsiveMap: BreakpointMap;
declare type SubscribeFunc = (screens: ScreenMap) => void;
declare const responsiveObserve: {
    matchHandlers: any;
    dispatch(pointMap: ScreenMap): boolean;
    subscribe(func: SubscribeFunc): number;
    unsubscribe(token: number): void;
    unregister(): void;
    register(): void;
};
export default responsiveObserve;
