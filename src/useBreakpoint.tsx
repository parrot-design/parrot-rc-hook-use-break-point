import React ,{ useState,useEffect } from 'react';
import ResponsiveObserve,{ ScreenMap } from './responsiveObserve';
 
function useBreakpoint():ScreenMap{
    
    const [screens,setScreens]=useState<ScreenMap>({});

    useEffect(()=>{
        const token=ResponsiveObserve.subscribe(supportScreens=>{ 
            setScreens(supportScreens);
        })
        return ()=>ResponsiveObserve.unsubscribe(token);
    },[]);

    return screens;

}

export default useBreakpoint;