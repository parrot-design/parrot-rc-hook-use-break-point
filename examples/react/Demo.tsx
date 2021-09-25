import React from 'react'; 
import useBreakpoint from '../../src';
import "./index.css";

const Demo=()=>{

    const screens=useBreakpoint();

    console.log("--screens-",screens)
    return (
        <div>

             
        </div>
    )
}

export default Demo;