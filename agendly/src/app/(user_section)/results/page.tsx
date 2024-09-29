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
            if(!events && isLoading){
                const genreated =  await generateEvents(localStorage.getItem(LOCAL_STORAGE_KEY ))
                console.log(genreated)
                setEvents(genreated.events)
                setIsLoading(false);
            }
        } 

        fetch();
        
    }, [])   
    


    //onsole.log(events)

    if (isLoading) {
        return <Loading />; 
      }
    
    return( <Results events={events} /> );

};

export default ResultsPage;
