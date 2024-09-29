'use client'
import Results from "@/app/content/components/Results"
import { generateEvents } from "@/app/utils/ai_functions";
import { EVENTS_STORAGE_KEY, LOCAL_STORAGE_KEY } from "@/lib/constants";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { set } from "zod";
import { EventInterface } from "@/app/utils/types";





const ResultsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState<EventInterface[] | undefined> (undefined);
    
    useEffect( () => {
        const fetch = async () => {
            if(!localStorage.getItem(EVENTS_STORAGE_KEY)) {
                const genreated =  await generateEvents(localStorage.getItem(EVENTS_STORAGE_KEY ) ?? "default msg" )
                localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(genreated.events));
                console.log(genreated)
                setEvents(genreated.events)
                setIsLoading(false);
            }
            else{
                setEvents(JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY) as string))
                setIsLoading(false);
            }
        } 

        fetch();
        
    }, [])   
    


    //onsole.log(events)

    if (isLoading) {
        return <Loading />; 
      }
    
    return( <Results/> );

};

export default ResultsPage;
