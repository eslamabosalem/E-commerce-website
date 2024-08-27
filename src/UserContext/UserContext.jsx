import { createContext, useEffect, useState } from "react";


export let UserContext= createContext(0);



export default function UserContextProvider(props){



const [Userlogin, setUserLogin] = useState(null);


useEffect(()=>{
    //token in local storage بتروح ست وتحط فيها 
if(localStorage.getItem("userToken")!==null){
    setUserLogin(localStorage.getItem("userToken"))
}
},[])




return <UserContext.Provider value={{Userlogin, setUserLogin}}>
{props.children}
</UserContext.Provider>



}