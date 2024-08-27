import React, { createContext, useState } from 'react'

export  let counterContext=createContext(0);


export default function CounterContextProvider(props){

    const [counter1, setCounter1] = useState(0)
    const [counter2, setCounter2] = useState(0)
    
    function changrCounter(){
        setCounter1(Math.random())
    }

    
//  counter1 ,counter2 من خلالة بمد  المشروع بتاعى 
return <>
<counterContext.Provider value={{counter1,counter2 ,changrCounter}}>
{props.children}


</counterContext.Provider>




</>

}




