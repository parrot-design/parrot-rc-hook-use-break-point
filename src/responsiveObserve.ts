export type Breakpoint='xs'|'sm'|'md'|'lg'|'xl'|'xxl';
export type BreakpointMap=Record<Breakpoint,string>;
export type ScreenMap=Partial<Record<Breakpoint,string>>;
export type ScreenSizeMap=Partial<Record<Breakpoint,number>>;
 
export const responsiveArray:Breakpoint[]=['xs','sm','md','lg','xl','xxl'];

export const responsiveMap:BreakpointMap={
    xs:'(max-width: 575px)',
    sm:'(min-width: 576px) and (max-width:767px)',
    md:'(min-width: 768px) and (max-width:991px)',
    lg:'(min-width: 992px) and (max-width:1199px)',
    xl:'(min-width: 1200px) and (max-width:1599px)',
    xxl:'(min-width: 1600px)'
};

type SubscribeFunc=(screens:ScreenMap)=>void;
const subscribers=new Map<Number,SubscribeFunc>();
let subUid=-1;
let screens={};
let NoMatchScreens={} as any;

responsiveArray.forEach((breakpoint)=>{
    NoMatchScreens[breakpoint]=false;
})

const responsiveObserve={
    matchHandlers:{} as any,
    dispatch(pointMap:ScreenMap){ 
        screens=pointMap;
        subscribers.forEach(func=>func(screens));
        return subscribers.size>=1;
    },
    subscribe(func:SubscribeFunc):number{
        if(!subscribers.size) this.register();
        subUid+=1;
        subscribers.set(subUid,func);
        func(screens);
        return subUid;
    },
    unsubscribe(token:number){
        subscribers.delete(token);
        if(!subscribers.size) this.unregister();
    },
    unregister() {
        Object.keys(responsiveMap).forEach((screen: string  ) => {
          const matchMediaQuery = responsiveMap[screen as Breakpoint];
          const handler = this.matchHandlers[matchMediaQuery];
          handler?.mql.removeListener(handler?.listener);
        });
        subscribers.clear();
    },
    register(){
        Object.keys(responsiveMap).forEach((screen:string)=>{
            const matchMediaQuery=responsiveMap[screen as Breakpoint];
            const listener=({matches}:{matches:boolean})=>{  
                if(matches){
                    this.dispatch({
                        ...NoMatchScreens,
                        [screen]:matches
                    })
                } 
            }
            const mql=window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            this.matchHandlers[matchMediaQuery]={
                mql,
                listener
            };
            listener(mql);
        })
    }
}

export default responsiveObserve;