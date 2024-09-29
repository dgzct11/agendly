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
    const [calendarTitle, setCalendarTitle] = useState<string | undefined>(undefined);
    
    useEffect( () => {
        const fetch = async () => {
            if(!events && isLoading){
                //@ts-ignore
                const genreated =  await generateEvents(localStorage.getItem(LOCAL_STORAGE_KEY ))
                console.log(genreated)
                setEvents(genreated.events)
                setCalendarTitle(genreated.calendarTitle)
                setIsLoading(false);
            }
        } 

        fetch();
        
    }, [])   
    


    //onsole.log(events)

    if (isLoading) {
        return <Loading />; 
      }
    //@ts-ignore
    return( <Results events={events} calendarTitle={calendarTitle} setCalendarTitle={setCalendarTitle} setEvents={setEvents} /> );

};

export default ResultsPage;
