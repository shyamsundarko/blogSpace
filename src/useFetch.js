import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [information, setInformation] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => { //renders every time data is changed.
        const abortCont = new AbortController();

         fetch(url, {signal: abortCont.signal})
         .then(res => {
             if(!res.ok){
                 throw Error('Could not fetch the data for that resource');
             }
             return res.json();
         })
         .then(data => {
            setInformation(data);
            setIsPending(false);
            setError(null);
         })
         .catch (err => {
             if(err.name==="AbortError"){
                 console.log("Fetch aborted");
             }
             else {
                setError(err.message);
                setIsPending(false);
             }
             
         }); 
         
         return () => abortCont.abort();
    }, [url]);

    return {information, isPending, error};
}


export default useFetch;